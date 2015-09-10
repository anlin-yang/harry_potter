var DiscountStrategy = require('../../main/discount-strategy.js');

describe("DiscountStrategy", function() {
  describe("constructor", function() {

    it("should accept description as parameters to create object.", function() {
      var theDiscountStrategy1 = new DiscountStrategy("BUY_ONE_BOOK_GET_0%_DISCOUNT.");
      expect(theDiscountStrategy1.variety).toBe(1);
      expect(theDiscountStrategy1.discount).toBe(0);
    });

    it("should accept description, variety, discount as parameters to create object.", function() {
      var theDiscountStrategy2 = new DiscountStrategy("BUY_TWO_DIFFERENT_BOOKS_GET_5%_DISCOUNT.", 2, 0.05);
      var theDiscountStrategy5 = new DiscountStrategy("BUY_FIVE_DIFFERENT_BOOKS_GET_25%_DISCOUNT.", 5, 0.25);
      expect(theDiscountStrategy2.variety).toBe(2);
      expect(theDiscountStrategy2.discount).toBe(0.05);
      expect(theDiscountStrategy5.variety).toBe(5);
      expect(theDiscountStrategy5.discount).toBe(0.25);
    });
  });
});
