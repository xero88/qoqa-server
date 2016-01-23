
exports.index = function(req, res) {



    var currentUser = Parse.User.current();



    if (currentUser) {
        console.log("Success login");

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
