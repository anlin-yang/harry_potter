var allBooks = [];

function BasketItem(title, count) {
  this.title = title;
  this.count = count;
};

BasketItem.setAllBooks = function(bookArr) {
  allBooks = bookArr;
};

BasketItem.prototype._getBook = function() {
  if (this._item) {
    return this._item;
  } else {
    var that = this;
    var book;
    allBooks.forEach(function(val) {
      if (val.title === that.title) {
        book = val;
      }
    });
    this._item = book;
    return book;
  }
};

BasketItem.prototype.getPrice = function() {
  var book = this._getBook();
  return book.price;
};

module.exports = BasketItem;
