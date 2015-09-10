var DiscountItem = require('../../main/discount-item.js');
var BasketItem = require('../../main/basket-item.js');
var DiscountStrategy = require('../../main/discount-strategy.js');

describe("DiscountItem", function() {
  var theDiscountItem;
  beforeEach(function() {
    var theDiscountStrategy = new DiscountStrategy("BUY_THREE_DIFFERENT_BOOKS_GET_10%_DISCOUNT.", 3, 0.1);
    var discountItems = [
      new BasketItem('1st', 2),
      new BasketItem('2nd', 1),
      new BasketItem('3rd', 3)
    ];

    theDiscountItem = new DiscountItem(theDiscountStrategy);
    theDiscountItem.discItems = discountItems;
  });

  describe("conctructor", function() {
    it("should accept discountStrategy as parameter and include Array discItems.", function() {
      expect(theDiscountItem.discItems instanceof Array).toBe(true);
      expect(theDiscountItem.discItems.length).toBe(3);
    });
  });

  describe("getTotalPrice", function() {
    it("should return the correct total price of discount item.", function() {
      expect(theDiscountItem.getTotalPrice()).toBe(24);
    });
  });

  describe("getSubtotalPrice", function() {
    it("should return the correct price after discount.", function() {
      expect(theDiscountItem.getSubtotalPrice()).toBe(21.6);
    });
  });

});
