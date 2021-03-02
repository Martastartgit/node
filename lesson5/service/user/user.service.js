const { userModel: { modelUser } } = require('../../dataBase');

module.exports = {
    getAllUsers: (filterObject) => modelUser.find(filterObject),

    getUserById: (userId) => modelUser.findById(userId),

    createUser: (userObject) => modelUser.create(userObject),

    deleteUserById: (userId) => modelUser.findByIdAndDelete(userId)
};
