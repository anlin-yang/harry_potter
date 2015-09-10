var BasketItem = require('./basket-item.js');
var ShoppingBasket = require('./shopping-basket.js');

function Main() {}

Main.prototype.poster = function(items) {
  var shoppingBasket = new ShoppingBasket();
  var bestPrice = 0;
  items.forEach(function(val) {
    shoppingBasket.addItem(val.title, val.count);
  });
  shoppingBasket.groupingAllWay();
  bestPrice = shoppingBasket.getBestPrice();

  return bestPrice;
};

module.exports = Main;
