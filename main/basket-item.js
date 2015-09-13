var Book = require('./book.js');
var allBooks = [];

function BasketItem(title, count) {
  this.title = title;
  this.count = count;
  this.book = new Book(title);
}

BasketItem.setAllBooks = function(bookArr) {
  allBooks = bookArr;
};

BasketItem.prototype.getPrice = function() {
  return this.book.price;
};

module.exports = BasketItem;
