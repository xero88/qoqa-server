
/*
 * Create coupon after save Order
 */
Parse.Cloud.afterSave("Order", function(request, response) {

    var CouponClass = Parse.Object.extend("Coupon");
    var coupon = new CouponClass();
    coupon.set("couponId", generateId());
    coupon.set("type", getRandomKey());
    coupon.set("user", request.object.get("user"));
    coupon.set("used", false);
    coupon.save(null,{
        success:function() {
            response.success();
        },
        error:function(error) {
            response.error(error);
        }
    });

});

/*
 * Get the type of coupon
 *
 * 1 = gold
 * 2 = silver
 * 3 = bronze
 *
 */
function getRandomKey() {
    var random = Math.random();
    if (random < 0.75) {
        return 3;
    }
    else if (random < 0.95) {
        return 2;
    }
    else {
        return 1;
    }
}

/*
 * Generate coupon ID randomly
 */
function generateId(){
    return Math.round(Math.random() * 100000000)
}

