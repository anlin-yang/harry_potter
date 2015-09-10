function DiscountStrategy(description, variety, discount) {
  this.description = description;
  this.variety = variety || 1;
  this.discount = discount || 0;
}

module.exports = DiscountStrategy;
