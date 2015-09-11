var ShoppingBasket = require('../../main/shopping-basket.js');
var DiscountStrategy = require('../../main/discount-strategy.js');

describe("ShoppingBasket", function() {
  var shopBasket;

  beforeEach(function() {
    shopBasket = new ShoppingBasket();
    shopBasket.addItem('1st', 2);
    shopBasket.addItem('2nd', 2);
    shopBasket.addItem('3rd', 2);
    shopBasket.addItem('4th', 1);
    shopBasket.addItem('5th', 1);

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
      expect(shopBasket.basketItems instanceof Array).toBe(true);
    });
  });

  describe("addItem", function() {
    it("should correct add Book to the ShoppingBasket.", function() {
      expect(shopBasket.basketItems.length).toBe(5);
    });

    it("shouldn`t add new elements，should be added to the existing.", function() {
      shopBasket.addItem('2nd', 3);
      expect(shopBasket.basketItems.length).toBe(5);
    });
  });

  describe("getVarietyNum", function() {
    it("should return correct variety number of books.", function() {
      expect(shopBasket.getVarietyNum(shopBasket.basketItems)).toBe(5);
      shopBasket.basketItems[4].count--;
      expect(shopBasket.getVarietyNum(shopBasket.basketItems)).toBe(4);
    });
  });

  describe("getDiscountItem", function() {
    it("should accept basketItems, varietyNum as parameters to create object DiscountItem.", function() {
      var discItem = shopBasket.getDiscountItem(shopBasket.basketItems, 5);
      expect(discItem.discItems instanceof Array).toBe(true);
      expect(discItem.discItems.length).toBe(5);
      expect(discItem.discountStrategy.discount).toBe(0.25);
    });
  });

  describe("getGroupingWay", function() {
    it("should accept basketItems, varietyNum, groupNum as parameters to create GroupingWay.", function() {
      var groupingWay = shopBasket.getGroupingWay(shopBasket.basketItems, 5, 5);
      expect(groupingWay.groupingItems instanceof Array).toBe(true);
      expect(groupingWay.groupingItems.length).toBe(2);
      expect(groupingWay.groupingItems[0].getSubtotalPrice()).toBe(30);
      expect(groupingWay.groupingItems[1].getSubtotalPrice()).toBe(21.6);
    });
  });

  describe("groupingAllWay", function() {
    it("grouping all groupingways to attribute allGroupingWays.", function() {
      expect(shopBasket.allGroupingWays.length).toBe(0);
      shopBasket.groupingAllWay();
      expect(shopBasket.allGroupingWays.length).toBe(4);
    });
  });

  describe("getBestPrice", function() {
    it("should return The cheapest price from all grouping ways.", function() {
      shopBasket.groupingAllWay();
      expect(shopBasket.getBestPrice()).toBe(51.2);
    });
  });

  describe("more getBestPrice", function() {
    it("should return The cheapest price from all grouping ways.", function() {
      shopBasket = new ShoppingBasket();
      shopBasket.addItem('1st', 0);
      shopBasket.addItem('2nd', 1);
      shopBasket.addItem('3rd', 1);
      shopBasket.addItem('4rd', 1);

      var discStrategys = [
        new DiscountStrategy("BUY_ONE_BOOK_GET_0%_DISCOUNT."),
        new DiscountStrategy("BUY_TWO_DIFFERENT_BOOKS_GET_5%_DISCOUNT.", 2, 0.05),
        new DiscountStrategy("BUY_THREE_DIFFERENT_BOOKS_GET_10%_DISCOUNT.", 3, 0.1),
        new DiscountStrategy("BUY_FOUR_DIFFERENT_BOOKS_GET_20%_DISCOUNT.", 4, 0.2),
        new DiscountStrategy("BUY_FIVE_DIFFERENT_BOOKS_GET_25%_DISCOUNT.", 5, 0.25)
      ];
      ShoppingBasket.setDiscStrategys(discStrategys);
      shopBasket.groupingAllWay();
      expect(shopBasket.getBestPrice()).toBe(3*(8*(1-0.1)));
    });

    it("should return The cheapest price from all grouping ways.", function() {
      shopBasket = new ShoppingBasket();
      shopBasket.addItem('1st', 4);
      shopBasket.addItem('2nd', 4);
      shopBasket.addItem('3rd', 5);

      var discStrategys = [
        new DiscountStrategy("BUY_ONE_BOOK_GET_0%_DISCOUNT."),
        new DiscountStrategy("BUY_TWO_DIFFERENT_BOOKS_GET_5%_DISCOUNT.", 2, 0.05),
        new DiscountStrategy("BUY_THREE_DIFFERENT_BOOKS_GET_10%_DISCOUNT.", 3, 0.1),
        new DiscountStrategy("BUY_FOUR_DIFFERENT_BOOKS_GET_20%_DISCOUNT.", 4, 0.2),
        new DiscountStrategy("BUY_FIVE_DIFFERENT_BOOKS_GET_25%_DISCOUNT.", 5, 0.25)
      ];
      ShoppingBasket.setDiscStrategys(discStrategys);
      shopBasket.groupingAllWay();
      expect(shopBasket.getBestPrice()).toBe(12*(8*(1-0.1))+8);
    });

    it("should return The cheapest price from all grouping ways.", function() {
      shopBasket = new ShoppingBasket();
      shopBasket.addItem('1st', 4);
      shopBasket.addItem('2nd', 3);
      shopBasket.addItem('3rd', 4);
      shopBasket.addItem('4th', 4);
      shopBasket.addItem('5th', 1);

      var discStrategys = [
        new DiscountStrategy("BUY_ONE_BOOK_GET_0%_DISCOUNT."),
        new DiscountStrategy("BUY_TWO_DIFFERENT_BOOKS_GET_5%_DISCOUNT.", 2, 0.05),
        new DiscountStrategy("BUY_THREE_DIFFERENT_BOOKS_GET_10%_DISCOUNT.", 3, 0.1),
        new DiscountStrategy("BUY_FOUR_DIFFERENT_BOOKS_GET_20%_DISCOUNT.", 4, 0.2),
        new DiscountStrategy("BUY_FIVE_DIFFERENT_BOOKS_GET_25%_DISCOUNT.", 5, 0.25)
      ];
      ShoppingBasket.setDiscStrategys(discStrategys);
      shopBasket.groupingAllWay();
      expect(shopBasket.getBestPrice()).toBe(16*(8*(1-0.2)));
    });

    //我大概搞明白你的算法了，下面这个测试过不了。
    //像这种题目最测试你划分边界条件了
    it("should return The cheapest price from all grouping ways.", function() {
      shopBasket = new ShoppingBasket();
      shopBasket.addItem('1st', 4);
      shopBasket.addItem('2nd', 3);
      shopBasket.addItem('3rd', 4);
      shopBasket.addItem('4th', 4);
      shopBasket.addItem('5th', 2);

      var discStrategys = [
        new DiscountStrategy("BUY_ONE_BOOK_GET_0%_DISCOUNT."),
        new DiscountStrategy("BUY_TWO_DIFFERENT_BOOKS_GET_5%_DISCOUNT.", 2, 0.05),
        new DiscountStrategy("BUY_THREE_DIFFERENT_BOOKS_GET_10%_DISCOUNT.", 3, 0.1),
        new DiscountStrategy("BUY_FOUR_DIFFERENT_BOOKS_GET_20%_DISCOUNT.", 4, 0.2),
        new DiscountStrategy("BUY_FIVE_DIFFERENT_BOOKS_GET_25%_DISCOUNT.", 5, 0.25)
      ];
      ShoppingBasket.setDiscStrategys(discStrategys);
      shopBasket.groupingAllWay();
      expect(shopBasket.getBestPrice()).toBe(12*(8*(1-0.2))+5*8*(1-0.25));
    });
    
  });
});
