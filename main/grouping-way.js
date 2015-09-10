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

module.exports = GroupingWay;
