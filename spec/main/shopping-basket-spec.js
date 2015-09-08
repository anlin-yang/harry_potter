var ShoppingBasket = require('../../main/shopping-basket.js');

var theShoppingBasket;

beforeEach(function() {
  theShoppingBasket = new ShoppingBasket();
});

describe("ShoppingBasket", function() {
  describe("constructor", function() {
    it("basketItems`s type should return Array.", function() {
      expect(theShoppingBasket.basketItems instanceof Array).toBe(true);
    });
  });
});
