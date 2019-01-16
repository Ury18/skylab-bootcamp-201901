function Trousers(brand,type,size,color,price){

    this.type = type;
    Clothing.call(this, brand,size,color,price);


}

Trousers.prototype = Object.create(Clothing.prototype);
Trousers.prototype.constructor = Trousers;