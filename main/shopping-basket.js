var _ = require('lodash');
var BasketItem = require('./basket-item.js');
var DiscountItem = require('./discount-item.js');
var GroupingWay = require('./grouping-way.js');
var discStrategys = [];

function ShoppingBasket() {
  this.basketItems = [];
  this.allGroupingWays = [];
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

ShoppingBasket.prototype.getVarietyNum = function(basketItems) {
  var varietyNum = 0;
  basketItems.forEach(function(val) {
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

ShoppingBasket.prototype.getGroupingWay = function(basketItems, varietyNum, groupNum) {
  var groupingWay = new GroupingWay();

  while (varietyNum > 0) {
    var discountItem = this.getDiscountItem(basketItems, varietyNum);
    groupingWay.groupingItems.push(discountItem);
    var surplusVarietyNum = this.getVarietyNum(basketItems);
    varietyNum = surplusVarietyNum > groupNum ? groupNum : surplusVarietyNum;
  }

  return groupingWay;
};

ShoppingBasket.prototype.groupingAllWay = function() {
  var varietyNum = this.getVarietyNum(this.basketItems);
  var copyBasketItems = _.cloneDeep(this.basketItems);
  var groupNum = varietyNum;

  while (groupNum > 1) {
    varietyNum = groupNum;
    var groupingWay = this.getGroupingWay(copyBasketItems, varietyNum, groupNum);
    copyBasketItems = _.cloneDeep(this.basketItems);
    this.allGroupingWays.push(groupingWay);
    --groupNum;
  }
};


module.exports = ShoppingBasket;
