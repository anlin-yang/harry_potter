var Discount = require('../../main/discount.js');

describe("Discount", function() {
  describe("constructor", function() {
    var theDiscount1 = new Discount("BUY_ONE_BOOK_GET_0%_DISCOUNT.");
    var theDiscount2 = new Discount("BUY_TWO_DIFFERENT_BOOKS_GET_5%_DISCOUNT.", 2, 0.05);
    var theDiscount5 = new Discount("BUY_FIVE_DIFFERENT_BOOKS_GET_25%_DISCOUNT.", 5, 0.25);

    it("should accept description as parameters to create object.", function() {
      expect(theDiscount1.variety).toBe(1);
      expect(theDiscount1.discount).toBe(0);
    });

    it("should accept description, variety, discount as parameters to create object.", function() {
      expect(theDiscount2.variety).toBe(2);
      expect(theDiscount2.discount).toBe(0.05);
      expect(theDiscount5.variety).toBe(5);
      expect(theDiscount5.discount).toBe(0.25);
    });
  });
});
