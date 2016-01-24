var _ = require('underscore');
var Gift = Parse.Object.extend('Gift');

exports.index = function(req, res) {

    var query = new Parse.Query(Gift);
    query.descending('createdAt');
    query.find().then(function(results) {
            res.render('gift/index', {
                gifts: results
            });
        },
        function() {
            res.send(500, 'Failed loading posts');
        });
};

exports.add = function(req, res) {

    res.render('gift/add', {
            message: '',
            type: ''
        }
    );

};

exports.addSave = function(req, res) {


    // TODO push to devices ?

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

    var giftId = req.params.id;

    res.render('gift/edit', {

        }
    );

};

exports.editSave = function(req, res) {

    // TODO push to devices ?

    var giftId = req.params.id;

    res.render('gift/edit', {

        }
    );

};

exports.delete = function(req, res) {


    // TODO push to devices ?

    var giftId = req.params.id;

};

exports.doDraw = function(req, res) {

    var giftId = req.params.id;

    res.render('gift/draw', {

        }
    );

};