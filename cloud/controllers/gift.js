var underscore = require('cloud/libs/underscore-min');
var Gift = Parse.Object.extend('Gift');
var Coupon = Parse.Object.extend('Coupon');

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

exports.create = function(req, res) {

    gift.save(underscore.pick(req.body, 'name', 'giftType')).then(function() {
            res.redirect('/');
        },
        function() {
            res.send(500, 'Failed saving comment');
        });

};

exports.edit = function(req, res) {
    var query = new Parse.Query(Gift);
    query.get(req.params.id).then(function(gift) {
            if (gift) {
                res.render('gift/edit', {
                    gift: gift
                })
            } else {
                res.send('specified gift does not exist')
            }
        },
        function() {
            res.send(500, 'Failed finding gift to edit');
        });
};


exports.update = function(req, res) {

    var gift = new Gift();
    gift.id = req.params.id;
    gift.save(underscore.pick(req.body, 'name', 'giftType', 'drawDate')).then(function() {
            res.redirect('/gift/edit/' + gift.id);
        },
        function() {
            res.send(500, 'Failed saving gift !!');
        });

};

exports.delete = function(req, res) {

    var gift = new Gift();
    gift.id = req.params.id;

    var query = new Parse.Query(Gift)
    query.equalTo("gift", gift)
    query.find().then(function(results) {
        results.push(gift)
        return Parse.Object.destroyAll(results)
    }).then(function () {
        res.redirect('/gift')
    }, function() {
        res.send(500, 'Failed deleting gift')
    })
};


exports.doDraw = function(req, res) {

        var winner = null;

        // 2. save the winner
        var gift = new Gift();
        var query = new Parse.Query(Gift);
        query.get(req.params.id, {
            success: function(gift) {

                if(gift.get("winner") != null)
                    res.send(500, 'Error, winner still attributed');

                // first we get all coupon of gift type
                var coupon = new Coupon();
                var query = new Parse.Query(Coupon);
                query.equalTo("type", gift.get("type"));
                query.notEqualTo("used", true);
                query.find({
                    success: function (coupons) {

                        if(coupons.length == 0){
                            res.send(500, 'No coupons!'); // TODO bizarre passe pas...
                            return;
                        }

                        // 1. Randomly choose winner
                        var winnerCoupon = coupons[Math.floor(Math.random() * coupons.length)];
                        winner = winnerCoupon.get("user");

                        // set coupon as used
                        winnerCoupon.set("used", true);
                        winnerCoupon.save();

                        gift.set("winner", winner);
                        gift.save();

                        // 2. Send push notification to query
                        var channel = "QoQa_" + winner.id;
                        console.log("New winner push : " + channel);
                        Parse.Push.send({
                            channels: [ channel ],
                            data: {
                                alert: "You are the winner !",
                                giftId: gift.id
                            }
                        }, {
                            success: function() {
                                res.render('gift/draw', {
                                        winner: winner
                                    }
                                );
                            },
                            error: function(error) {
                                res.send(500, 'Error at push : ' + error.message);
                            }
                        });


                    },
                    error: function (object, error) {
                        res.send(500, 'Error query coupon : ' + error.message);
                    }
                });

            },
            error: function(object, error) {
                res.send(500, 'Error query gift : ' + error.message);
            }
        });

};