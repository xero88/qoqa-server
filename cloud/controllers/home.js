
exports.index = function(req, res) {

    var currentUser = Parse.User.current();
    if (currentUser) {
        res.render('home/index', {
                currentUser: currentUser
            }
        );
    } else {
        res.render('home/index', {
                currentUser: null
            }
        );
    }
};
