
// Login user
exports.index = function(req, res) {

    res.render('user/login', {
            message: '',
            type: ''
        }
    );

};

exports.login = function(req, res) {

    Parse.User.logIn(req.body.username, req.body.password, {
        success: function(user) {
            res.render('user/login', {
                message: 'Login is done',
                type: 'success'
            });
        },
        error: function(user, error) {
            res.render('user/login', {
                    message: error.message,
                    type: 'danger'
                }
            );
        }
    });

};