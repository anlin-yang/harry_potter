var ShoppingBasket = require('../../main/shopping-basket.js');

var theShoppingBasket;

beforeEach(function() {
  theShoppingBasket = new ShoppingBasket();
  theShoppingBasket.addItem('1st', 2);
  theShoppingBasket.addItem('2nd', 2);
  theShoppingBasket.addItem('3rd', 2);
  theShoppingBasket.addItem('4th', 1);
  theShoppingBasket.addItem('5th', 1);
});

describe("ShoppingBasket", function() {
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


});
