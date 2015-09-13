function DiscountItem(discountStrategy) {
  this.discountStrategy = discountStrategy;
  this.itemList = [];
}

DiscountItem.prototype.getTotalPrice = function() {
  var totalPrice = 0;
  this.itemList.forEach(function(val) {
    totalPrice += 8;
  });

  return totalPrice;
};

DiscountItem.prototype.getSubtotalPrice = function() {
  var discountPrice = 0;
  var that = this;
  this.itemList.forEach(function(val) {
    discountPrice += 8 * that.discountStrategy.discount;
  });

  return this.getTotalPrice() - discountPrice;
};

module.exports = DiscountItem;
