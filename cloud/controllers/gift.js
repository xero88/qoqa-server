
exports.index = function(req, res) {

    res.render('gift/index', {

        }
    );
};

exports.add = function(req, res) {

    res.render('gift/add', {
            message: '',
            type: ''
        }
    );

};

exports.addSave = function(req, res) {

    var Gift = Parse.Object.extend("Gift");
    var gift = new Gift();

    gift.set("type", parseInt(req.body.giftType));
    gift.set("name", req.body.name);
    gift.set("winner", null);
    gift.set("drawDate",  new Date()); // TODO date

    gift.save(null, {
        success: function(gift) {
            res.render('gift/add', {
                    message: 'Gift added !',
                    type: 'success'
                }
            );
        },
        error: function(gift, error) {
            res.render('gift/add', {
                    message: error.message,
                    type: 'danger'
                }
            );
        }
    });

};

exports.edit = function(req, res) {

    var id = req.params.id;

    res.render('gift/edit', {

        }
    );

};

exports.editSave = function(req, res) {

    var id = req.params.id;

    res.render('gift/edit', {

        }
    );

};

exports.delete = function(req, res) {

    var id = req.params.id;

};
