function DiscountItem(discountStrategy) {
  this.discountStrategy = discountStrategy;
  this.discItems = [];//这个属性名起得不好，要不是就是类名起得不好，总有一个要改
}

DiscountItem.prototype.getTotalPrice = function() {//感觉这就是一个私有方法
  var totalPrice = 0;
  this.discItems.forEach(function(val) {
    totalPrice += 8;
  });

  return totalPrice;
};

DiscountItem.prototype.getSubtotalPrice = function() {
  var discountPrice = 0;
  var that = this;
  this.discItems.forEach(function(val) {
    discountPrice += 8 * that.discountStrategy.discount;
  });

  return this.getTotalPrice() - discountPrice;
};

module.exports = DiscountItem;
