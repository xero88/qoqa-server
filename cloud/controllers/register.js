
exports.index = function(req, res) {

    res.render('user/register', {
            message: '',
            type: ''
        }
    );

};

exports.register = function(req, res) {

    var user = new Parse.User();
    user.set("username", req.body.username);
    user.set("password", req.body.password);
    user.set("firstname", req.body.firstname);
    user.set("lastname", req.body.lastname);

    user.signUp(null, {
        success: function(user) {
            res.render('user/register', {
                    message: 'Register is done',
                    type: 'success'
                });
        },
        error: function(user, error) {
            res.render('user/register', {
                    message: error.message,
                    type: 'danger'
                }
            );
        }
    });

};