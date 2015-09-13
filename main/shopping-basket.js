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
  discountItem.discountStrategy = _.find(discStrategys, function(val) {
    return val.variety === varietyNum;
  });
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

  while (varietyNum > 0) { //varietyNum传来传去的，必要的时候应该换个名字，更清楚表达含义
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
  var groupNum = varietyNum; //为什么varietyNumber就是groupNum？

  while (groupNum > 1) { //为什么要循环最大的不同本数？
    varietyNum = groupNum; //为什么又赋值回去了？就不能换个变量名？
    var groupingWay = this.getGroupingWay(copyBasketItems, varietyNum, groupNum);
    copyBasketItems = _.cloneDeep(this.basketItems);
    this.allGroupingWays.push(groupingWay);

    --groupNum;
  }
};

ShoppingBasket.prototype.getBestPrice = function() {
  var bestPrice = 0;
  if (this.allGroupingWays.length > 0) {
    var subtotal = this.allGroupingWays[0].getSubtotalPrice();
    bestPrice = subtotal;
    this.allGroupingWays.forEach(function(val) {
      subtotal = val.getSubtotalPrice();
      bestPrice = bestPrice < subtotal ? bestPrice : subtotal;
    });
  }

  return bestPrice;
};

module.exports = ShoppingBasket;
