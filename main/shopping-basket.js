var BasketItem = require('./basket-item.js');

function ShoppingBasket() {
  this.basketItems = [];
}

ShoppingBasket.prototype.addItem = function(title, count) {
  var existItems = this.basketItems.filter(function(val) {
    return val.title === title;
  });

  if (existItems.length !== 0) {
    existItems[0].count += count;
  } else {
    var basketItem = new BasketItem(title, count);
    this.basketItems.push(basketItem);
  }
}

module.exports = ShoppingBasket;
