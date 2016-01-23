
// Login user
exports.index = function(req, res) {

    res.render('user/login', {
            message: '',
            type: ''
        }
    );

};

exports.login = function(req, res) {

    Parse.User.logIn(req.body.username, req.body.password).then(function(user) {
        res.redirect('/');
    }, function(error) {
        res.render('user/login', {
                message: error.message,
                type: 'danger'
            }
        );
    });



};

exports.logout = function(req, res) {
    Parse.User.logOut();
    res.redirect('/');
};