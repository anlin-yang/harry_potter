var Book = require('../../main/book.js');

describe("Book", function() {
  describe("contructor", function() {
    it("should accept title, price as parameters.", function() {
      var theBook1 = new Book('1st', 10);

      expect(theBook1.title).toBe('1st');
      expect(theBook1.price).toBe(10);
    });

    it("should accept title as parameter, but default price is 8.", function() {
      var theBook2 = new Book('2nd');

      expect(theBook2.title).toBe('2nd');
      expect(theBook2.price).toBe(8);
    });
  });
});
