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
    this.basketItems.push({
      title: title,
      count: count
    });
  }
}

module.exports = ShoppingBasket;
