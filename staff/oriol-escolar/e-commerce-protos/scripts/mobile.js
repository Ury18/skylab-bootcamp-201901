function Mobile(brand,model,color,price){

    this.brand=brand;
    this.color=color;
    this.model=model;
    this.price=price;
    
    // Electronics.call(this, brand,model,price)

}

Mobile.prototype = Object.create(Electronics.prototype);
Mobile.prototype.constructor = Mobile;