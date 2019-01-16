function Clothing(brand,size,color,price){

    this.size = size;
    Product.call(this, brand,color,price);


}

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;
