function GroupingWay() {
  this.groupingItems = [];
}

GroupingWay.prototype.getTotalPrice = function() {
  var totalPrice = 0;
  this.groupingItems.forEach(function(val) {
    totalPrice += val.getTotalPrice();
  });

  return totalPrice;
};

GroupingWay.prototype.getSubtotalPrice = function() {
  var subtotalPrice = 0;
  this.groupingItems.forEach(function(val) {
    subtotalPrice += val.getSubtotalPrice();
  });

  return subtotalPrice;
};

module.exports = GroupingWay;
