const { userExistsInDB, addUserToDB, getUserWithUsernameFromDB } = require('../db/users');
const { v4: uuidv4 } = require('uuid');
const { encryptPassword, comparePassword } = require('../util/password');
const { signToken } = require('../util/token');

const registerUser = async (username, password) => {
    if (!username || !password) {
        throw new Error('Username and password are required');
    }

    const existUser = await userExistsInDB(username);
    if (existUser) {
        throw new Error('User already exists');
    }

    const newUser = {
        id: uuidv4(),
        username,
        password: encryptPassword(password),
    };

    await addUserToDB(newUser.id, newUser.username, newUser.password);
    const { password: _, ...userWithoutPassword } = newUser; // Exclude password
    return userWithoutPassword;
};

const loginUser = async (username, password) => {
    const existUser = await userExistsInDB(username);
    if (!existUser) {
        throw new Error('User not found');
    }

    const user = await getUserWithUsernameFromDB(username);
    if (!comparePassword(password, user.password)) {
        throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user; // Exclude password
    const token = signToken({ id: user.id, username: user.username });
    return { token, user: userWithoutPassword };
};

module.exports = {
    registerUser,
    loginUser,
};