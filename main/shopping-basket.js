var BasketItem = require('./basket-item.js');
var DiscountItem = require('./discount-item.js');
var discStrategys = [];

function ShoppingBasket() {
  this.basketItems = [];
}

ShoppingBasket.setDiscStrategys = function(discStrategyArr) {
  discStrategys = discStrategyArr;
};

ShoppingBasket.prototype.addItem = function(title, count) {
  var existItems = this.basketItems.filter(function(val) {
    return val.title === title;
  });
  if (existItems.length !== 0) {
    existItems[0].count += count;
  } else {
    var basketItem = new BasketItem(title, count);
    this.basketItems.push(basketItem);
  }
};

ShoppingBasket.prototype.getVarietyNum = function() {
  var varietyNum = 0;
  this.basketItems.forEach(function(val) {
    if (val.count !== 0) {
      varietyNum++;
    }
  });
  return varietyNum;
};

ShoppingBasket.prototype.getDiscountItem = function(basketItems, varietyNum) {
  var discountItem = new DiscountItem();
  var discountStrategy = discStrategys.filter(function(val) {
    return val.variety === varietyNum;
  });
  discountItem.discountStrategy = discountStrategy[0];
  basketItems.forEach(function(val) {
    if (val.count !== 0 && varietyNum > 0) {
      discountItem.discItems.push(val);
      val.count--;
      varietyNum--;
    }
  });
  return discountItem;
};

module.exports = ShoppingBasket;
