var BasketItem = require('../../main/basket-item.js');
var Book = require('../../main/book.js');

describe("BasketItem", function() {
  var theBasketItem;

  beforeEach(function() {
    var bookArr = [
      new Book('1st'),
      new Book('2nd'),
      new Book('3rd'),
      new Book('4th'),
      new Book('5th'),
    ];
    BasketItem.setAllBooks(bookArr);
    theBasketItem = new BasketItem('1st', 2);
  });

  describe("constructor", function() {
    it("should accept title, conut as parameters to create Object.should include Book object.", function() {
      expect(theBasketItem.title).toBe('1st');
      expect(theBasketItem.count).toBe(2);
      expect(theBasketItem.book.price).toBe(8);
    });
  });

  describe("getPrice", function() {
    it("should get correct Book price.", function() {
      expect(theBasketItem.getPrice()).toBe(8);
    });
  });

});
