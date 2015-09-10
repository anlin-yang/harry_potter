function DiscountItem(discountStrategy) {
  this.discountStrategy = discountStrategy;
  this.discItems = [];
}

DiscountItem.prototype.getTotalPrice = function() {
  var totalPrice = 0;

  this.discItems.forEach(function(val) {
    totalPrice += 8;
  });

  return totalPrice;
}

module.exports = DiscountItem;
