var ShoppingBasket = require('../../main/shopping-basket.js');
var DiscountStrategy = require('../../main/discount-strategy.js');

describe("ShoppingBasket", function() {
  var theShoppingBasket;

  beforeEach(function() {
    theShoppingBasket = new ShoppingBasket();
    theShoppingBasket.addItem('1st', 2);
    theShoppingBasket.addItem('2nd', 2);
    theShoppingBasket.addItem('3rd', 2);
    theShoppingBasket.addItem('4th', 1);
    theShoppingBasket.addItem('5th', 1);

    var discStrategys = [
      new DiscountStrategy("BUY_ONE_BOOK_GET_0%_DISCOUNT."),
      new DiscountStrategy("BUY_TWO_DIFFERENT_BOOKS_GET_5%_DISCOUNT.", 2, 0.05),
      new DiscountStrategy("BUY_THREE_DIFFERENT_BOOKS_GET_10%_DISCOUNT.", 3, 0.1),
      new DiscountStrategy("BUY_FOUR_DIFFERENT_BOOKS_GET_20%_DISCOUNT.", 4, 0.2),
      new DiscountStrategy("BUY_FIVE_DIFFERENT_BOOKS_GET_25%_DISCOUNT.", 5, 0.25)
    ];
    ShoppingBasket.setDiscStrategys(discStrategys);
  });

  describe("constructor", function() {
    it("basketItems`s type should return Array.", function() {
      expect(theShoppingBasket.basketItems instanceof Array).toBe(true);
    });
  });

  describe("addItem", function() {
    it("should correct add Book to the shoppingBasket.", function() {
      expect(theShoppingBasket.basketItems.length).toBe(5);
    });

    it("shouldn`t add new elements，should be added to the existing.", function() {
      theShoppingBasket.addItem('2nd', 3);
      expect(theShoppingBasket.basketItems.length).toBe(5);
    });
  });

  describe("getVarietyNum", function() {
    it("should return correct variety number of books.", function() {
      expect(theShoppingBasket.getVarietyNum()).toBe(5);
      theShoppingBasket.basketItems[4].count--;
      expect(theShoppingBasket.getVarietyNum()).toBe(4);
    });
  });

  describe("getDiscountItem", function() {
    it("should accept basketItems, varietyNum as parameters to create object DiscountItem.", function() {
      var discItem = theShoppingBasket.getDiscountItem(theShoppingBasket.basketItems, 5);
      expect(discItem.discItems instanceof Array).toBe(true);
      expect(discItem.discItems.length).toBe(5);
      expect(discItem.discountStrategy.discount).toBe(0.25);
    });
  });

  describe("getGroupingWay", function() {
    it("should accept basketItems, varietyNum, groupNum as parameters to create GroupingWay.", function() {
      var groupingWay = theShoppingBasket.getGroupingWay(theShoppingBasket.basketItems, 5, 5);
      expect(groupingWay.groupingItems instanceof Array).toBe(true);
      expect(groupingWay.groupingItems.length).toBe(2);
      expect(groupingWay.groupingItems[0].getSubtotalPrice()).toBe(30);
      expect(groupingWay.groupingItems[1].getSubtotalPrice()).toBe(21.6);
    });
  });

});
