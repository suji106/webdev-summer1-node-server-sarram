var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials, {username: 1});
}

function findUserByCredentials2(credentials) {
    console.log(credentials)
    return userModel.findOne(credentials, {username: 1, password: ''});
}

function findUserById(userId) {
    return userModel.findById(userId);
}

function updateUser(user, userId) {
    return userModel.update({
        _id: userId
    }, {
        $set: user
    });
}

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    findUserByCredentials2: findUserByCredentials2,
    updateUser:updateUser
};

module.exports = api;