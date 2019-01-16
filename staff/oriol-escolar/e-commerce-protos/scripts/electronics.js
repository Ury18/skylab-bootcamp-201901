function Electronics(brand,model,price) {

this.model=model;
this.brand=brand;
this.price=price;

// Product.call(this, brand,price);

}

Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;