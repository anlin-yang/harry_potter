var GroupingWay = require('../../main/grouping-way.js');
var DiscountItem = require('../../main/discount-item.js');
var BasketItem = require('../../main/basket-item.js');
var DiscountStrategy = require('../../main/discount-strategy.js');

describe("GroupingWay", function() {
  var theGroupingWay;

  beforeEach(function() {
    theGroupingWay = new GroupingWay();

    var discStrategy1 = new DiscountStrategy("BUY_THREE_DIFFERENT_BOOKS_GET_10%_DISCOUNT.", 3, 0.1);
    var discItems1 = [
      new BasketItem('1st', 1),
      new BasketItem('2nd', 1),
      new BasketItem('3rd', 1)
    ];
    var discItem1 = new DiscountItem(discStrategy1);
    discItem1.itemList = discItems1;

    var discStrategy2 = new DiscountStrategy("BUY_FIVE_DIFFERENT_BOOKS_GET_25%_DISCOUNT.", 5, 0.25);
    var discItems2 = [
      new BasketItem('1st', 1),
      new BasketItem('2nd', 1),
      new BasketItem('3rd', 1),
      new BasketItem('4th', 1),
      new BasketItem('5th', 1)
    ];
    var discItem2 = new DiscountItem(discStrategy2);
    discItem2.itemList = discItems2;

    theGroupingWay.groupingItems.push(discItem1);
    theGroupingWay.groupingItems.push(discItem2);
  });

  describe("constructor", function() {
    it("should include groupingItems Array in this object.", function() {
      expect(theGroupingWay.groupingItems instanceof Array).toBe(true);
    });
  });

  describe("getTotalPrice", function() {
    it("should return the correct total price of one grouping way.", function() {
      expect(theGroupingWay.getTotalPrice()).toBe(64);
    });
  });

  describe("getSubtotalPrice", function() {
    it("should return the correct subtotal price of grouping way after discount.", function() {
      expect(theGroupingWay.getSubtotalPrice()).toBe(51.6);
    });
  });

});
