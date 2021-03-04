const { User: { UserModel } } = require('../../dataBase');

module.exports = {
    getAllUsers: (filterObject) => UserModel.find(filterObject),

    getUserById: (userId) => UserModel.findById(userId),

    createUser: (userObject) => UserModel.create(userObject),

    updateUser: (userId, userObject) => UserModel.findByIdAndUpdate(userId, userObject, { new: true }),

    deleteUserById: (userId) => UserModel.findByIdAndDelete(userId)
};
