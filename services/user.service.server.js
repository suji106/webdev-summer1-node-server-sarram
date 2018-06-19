module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.post('/api/user', createUser);
    app.put('/api/user', update);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);
    app.get('/api/user/:username/username', findUserByUsername);
    app.get('/api/user/:username/:password/user', findUserByUsernameAndPassword);

    var userModel = require('../models/user/user.model.server');

    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.json(user);
            })
    }

    function findUserByUsername(req, res) {
        var username = req.params['username'];
        userModel.findUserByCredentials(
            {username: username})
            .then(function (user) {
                res.json(user);
            })
    }

    function findUserByUsernameAndPassword(req, res) {
        var username = req.params['username'];
        var password = req.params['password'];
        userModel.findUserByCredentials2(
            {
                username: username,
                password: password
            }
        )
            .then(function (user) {
                console.log(user);
                res.json(user);
            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function profile(req, res) {
        if (typeof req.session.currentUser === 'undefined') {
            res.send(null);
        }
        else {
            var userId = req.session.currentUser._id;
            userModel.findUserById(userId)
                .then(function (user) {
                    res.send(user);
                })
        }
    }

    function update(req, res) {
        var user = req.body;
        userId = req.session.currentUser._id;
        userModel.updateUser(user, userId)
            .then(function (user) {
                res.json(user);
            })
    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }
}
