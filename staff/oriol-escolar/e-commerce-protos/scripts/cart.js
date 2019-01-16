function Cart() {

    var productList;

    
}

Cart.prototype.add = function (product) {

    if (this.productList!==undefined) {
        this.productList.push(product);
        
    }else{
        this.productList = new Array;
        this.productList[0]=product;
    }


}

Cart.prototype.totalPrice = function () {

    var sum = 0;
    
    for (var i = 0; i < this.productList.length; i++) {

        var object = this.productList[i];
        
        sum += object.price;
        

    }

    return sum;

}


Cart.prototype.numberOfItems = function () {

    

    return this.productList.length;



}

Cart.prototype.mostExpensive = function () {



    var value = 0;
    
    for (var i = 0; i < this.productList.length; i++) {

        var object = this.productList[i];
        
        if(object.price>value){
        value = object.price;
        }
        

    }

    return value;

}

Cart.prototype.cheapest = function () {




    var value = this.productList[0].price;
    
    for (var i = 0; i < this.productList.length; i++) {

        var object = this.productList[i];
        
        if(object.price<value){
        value = object.price;
        }
        

    }

    return value;


}

Cart.prototype.numberOf = function (value) {


    var sum = 0;
    
    for (var i = 0; i < this.productList.length; i++) {

        var object = this.productList[i];
        
        if( this.productList[i] instanceof value){
        sum += 1
        }

    }

    return sum;


}



//-------------------------------ProductsByPriceRange

//----Numero 


/*
Cart.prototype.productsByPriceRange = function (small,big) {



    var sum = 0;
    
    for(var i = 0; i < this.productList.length; i++)
    {
        if( this.productList[i].price >= small && this.productList[i].price <= big )
        {
            sum+=1;

        }


    }

    return sum;

}

*/

//----Array


Cart.prototype.productsByPriceRange = function (small,big) {

    var objects;

    for(var i = 0; i < this.productList.length; i++)
    {
        if( this.productList[i].price >= small && this.productList[i].price <= big )
        {
            if (objects!==undefined) {
                objects.push(this.productList[i]);
                
            }else{
                objects = new Array;
                objects[0]=this.productList[i];
            }

        }


    }

    

    return objects;

}

