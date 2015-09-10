var Main = require('../../main/main.js');
var ShoppingBasket = require('../../main/shopping-basket.js');
var DiscountStrategy = require('../../main/discount-strategy.js');

describe("Main", function() {
  var main;
  var items;

  beforeEach(function() {
    main = new Main();
    items = [{
      title: '1st',
      count: 2
    }, {
      title: '2nd',
      count: 2
    }, {
      title: '3rd',
      count: 2
    }, {
      title: '4th',
      count: 1
    }, {
      title: '5th',
      count: 1
    }];

    var discStrategys = [
      new DiscountStrategy("BUY_ONE_BOOK_GET_0%_DISCOUNT."),
      new DiscountStrategy("BUY_TWO_DIFFERENT_BOOKS_GET_5%_DISCOUNT.", 2, 0.05),
      new DiscountStrategy("BUY_THREE_DIFFERENT_BOOKS_GET_10%_DISCOUNT.", 3, 0.1),
      new DiscountStrategy("BUY_FOUR_DIFFERENT_BOOKS_GET_20%_DISCOUNT.", 4, 0.2),
      new DiscountStrategy("BUY_FIVE_DIFFERENT_BOOKS_GET_25%_DISCOUNT.", 5, 0.25)
    ];
    ShoppingBasket.setDiscStrategys(discStrategys);
  });

  describe("poster", function() {
    it("program enter, should accept items as parameter and return the cheapest price.", function() {
      expect(main.poster(items)).toBe(51.2);
    });
  });
});
