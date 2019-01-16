function Hat(brand,type,color,price){

    this.type = type;
    this.brand = brand;
    this.color = color;
    this.price = price;
    // Clothing.call(this, brand,color,price);


}

Hat.prototype = Object.create(Clothing.prototype);
Hat.prototype.constructor = Hat;