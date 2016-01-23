
exports.index = function(req, res) {

    var currentUser = Parse.User.current();
    if (currentUser) {
        res.render('index', {
                currentUser: currentUser
            }
        );
    } else {
        res.render('index', {
                currentUser: null
            }
        );
    }
};
