
/*
 * Create coupon after save Order
 */
Parse.Cloud.afterSave("Order", function(request, response) {

  var CouponClass = Parse.Object.extend("Coupon");
  var coupon = new CouponClass();
  coupon.set("couponId", generateId());
  coupon.set("type", getRandomKey());
  coupon.set("user", request.object.get("user"));
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
 */
function getRandomKey() {
  var random = Math.random();
  if (random < 0.75) {
    return 1;
  } else {
    return 2;
  }
}
/*
 * Generate coupon ID randomly
 */
function generateId(){
  return Math.round(Math.random() * 100000000)
}

