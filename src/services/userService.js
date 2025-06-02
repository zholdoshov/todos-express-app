const { getUsersFromDB, getUserWithUsernameFromDB, getUserWithIdFromDB, userExistsInDB, addUserToDB, updateUserInDB, deleteUserFromDB } = require('../db/users');

const getUser = async (userId) => {
    return await getUserWithIdFromDB(userId);
}

const getUsers = async () => {
    return await getUsersFromDB();
}

const userExists = async (username) => {
    return await userExistsInDB(username);
}

const addUser = async (id, username, password) => {
    return await addUserToDB(id, username, password);
}

const updateUser = async (id, username) => {
    return await updateUserInDB(id, username);
}

const deleteUser = async (id) => {
    return await deleteUserFromDB(id);
}

module.exports = {
    getUser,
    getUsers,
    userExists,
    addUser,
    updateUser,
    deleteUser,
};