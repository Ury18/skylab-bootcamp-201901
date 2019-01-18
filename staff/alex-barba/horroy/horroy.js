/**
 * Abstraction of an array.
 * 
 * Creates a version of an array,
 * 
 * @param {*} - Optional
 * 
 * @returns {Horroy}
 */

function Horroy(){
    this.length = arguments.length;
    
    if(arguments.length){
        for (var i = 0; i < arguments.length; i++) {
            this[i] = arguments[i];
        }
    }
};

/* Abstraction of .fill() */

Horroy.prototype.fill = function(value, start, end) {
    if (arguments.length > 4) throw Error('too many arguments');
    if (typeof start !== 'number' || typeof end !== 'number'  ) throw TypeError (start + ' or ' + end + ' is not a number');
    
    start = start === undefined ? 0 : (start < 0 ? this.length + start : start);
    end = end === undefined ? this.length : (end < 0 ? this.length + end : end);
    
        for (var i = start; i < end; i++) {
            this[i] = value;
        }
    return this;
};

/* Abstraction of .filter() */

Horroy.prototype.filter = function(callback){
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');
    
    var res = new Horroy();
    
    for (var i = 0; i < this.length; i++) {
        if(callback(this[i]) === true) {
            res[res.length] = this[i];
            res.length++;
        }
    }
    return res;
};

/* Abstraction of find */

Horroy.prototype.find = function(callback) {
    if (arguments.length > 1) throw Error('too many arguments');
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for (var i = 0; i < this.length; i++) {
        var value = this[i];
        if(callback(value) === true) return value;
    }    
};

/* Abstraction of forEach */

Horroy.prototype.forEach = function(callback) {
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

    for (var i = 0; i < this.length; i++) callback(this[i]);
};

/* Abstraction of indexOf */

Horroy.prototype.indexOf = function(value, start) {
    if (!(typeof start === 'number' || start !== 'undefined')) throw new TypeError(start + ' is not a number.')

    start = start? start : 0;

    for(var i=start; i<this.length; i++) {
        if (this[i] === value){
            return i;
        }
    }
    return -1;
};

/* Abstraction of join */

Horroy.prototype.join = function(separator) {
    var result = '';

    for (let i=0; i<this.length; i++) {
        if(this[i] === null || this[i] === undefined) this[i] = '';
        separator = separator? separator : '';

        result += this[i]
        
        if (i == this.length-1) {
            return result
        }
        result += separator;
    }
    return result;
};

/* Abstraction of map */

Horroy.prototype.map = function(callback) {
    if (!(callback instanceof Function)) throw TypeError (callback + ' is not a function');

    var res = new Horroy();

    debugger;

    for (var i = 0; i < this.length; i++) res[i] = callback(this[i]) + res.length++ ;
    
    return res;
};

/* Abstraction of .pop() */

Horroy.prototype.pop = function(){
    if (this.length === 0) return undefined
    var res = this[this.length-1]
    delete this[this.length-1];
    this.length = this.length--;
    return res;
};

/* Abstraction of push */

Horroy.prototype.push = function(element) {
    this[this.length]=element;

    if (arguments.length>2) {
        for (var i = 2; i<arguments.length; i++) {
            this[this.length] = arguments[i];
            this.length++
        }
    };
    return this.length;
};

/* Abstraction of reduce */

Horroy.prototype.reduce = function(callback, accumulator) {
    if (!(callback instanceof Function)) throw TypeError(callback + ' is not an function');

    var i = 0;

    if (accumulator === undefined) {
        accumulator = this[0];
        i = 1;
    };

    for (; i < this.length; i++) {
        var item = this[i];
        accumulator = callback(accumulator, item);
    };
    return accumulator;
};

/* Abstraction of reverse */

Horroy.prototype.reverse = function() {
    
    var duplicate = new Horroy();

    for (var i = 0; i < this.length; i++) {
        duplicate[i] = this[i];
        duplicate.length++
    }

    for (var i = duplicate.length; i > 0; i--){
        this[i-1] = duplicate[this.length-i];
    }
    return this
};

/* Abstraction of shift */

Horroy.prototype.shift = function() {
    if (this.length === 0) return undefined

    var res = this[0]
    var copy = new Horroy()

    for (var i = 1; i < this.length; i++) {
        copy[copy.length] = this[i];
        copy.length++;
    }

    this.length = copy.length;

    for (var i = 0; i < copy.length; i++) {
        this[i] = copy[i];
    }
    return res;
};

/* Abstraction of slice */

Horroy.prototype.slice = function(start, end) {
    var res = new Horroy();
        
    start = start ? start : 0;

    end = end ? end : this.length;

    if (end > this.length){ end = this.length};

    for (var i = start; i < end; i++) {
        res[res.length]= this[i]
        res.length++
    }
    return res;
};

/* Abstraction of some */

Horroy.prototype.some = function(callback){
    if(!(callback instanceof Function)) throw TypeError(callback + ' is not a function');

    for (var i =0; i < this.length; i++) {
        if (callback(this[i]) === true) return true; 
    }
    return false;
};

/* Abstraction of splice */

Horroy.prototype.splice = function(start, deleteCount, item){
    if (deleteCount > (array.length-start) || deleteCount === undefined) { deleteCount = array.length-start};

    
    var original = new Horroy();
    var items = new Horroy();
    var initial = new Horroy();
    var end = new Horroy();
    var final = new Horroy();
    var res = new Horroy();

    if (arguments.length >3) {
        for (var i = 3; i<arguments.length; i++) {
            items[items.length] = arguments[i];
            items.length++;
        }
    }
    
    for (let i = 0; i < start; i++) {
        initial[initial.length] = array[i]
        initial.length++;
    };

    for (let i = (start + deleteCount); i < array.length; i++) {
        end[end.length] = array[i]
        end.length++;
    };

    for (let i = start; i < (start+deleteCount); i++){
        res[res.length] = array[i]
        res.length++;
    };

    for (let i = 0; i < initial.length; i++) {
        final[final.length] = initial[i];
        final.length++;
    }
    for (let i = 0; i < items.length; i++) {
        final[final.length] = items[i];
        final.length++;
    }
    for (let i = 0; i < end.length; i++) {
        final[final.length] = end[i];
        final.length++;
    }

    this.length = final.length;

    for (let i = 0; i < final.length; i++) {
        this[i] = final[i];
    }
    return res;
};

/* Abstraction of unshift */

Horroy.prototype.unshift = function(element){
    var copy = new Horroy();

    for (var i = 0; i < arguments.length; i++) {
        copy[copy.length] = arguments[i]
        copy.length++
    };

    for (var i = 0; i < this.length; i++) {
        copy[copy.length] = this[i]
        copy.length++
    };

    this.length = copy.length;

    for (var i = 0; i < copy.length; i++) {
        this[i] = copy[i]
    };

    return this.length
};

/* Abstraction of toString */

Horroy.prototype.toString = function() {
    var string = '';
    
    for (var i = 0; i < this.length; i++) {
        if (i === this.length-1) {
            string += this[i]
        } else {
            string += this[i] + ','
        }
    }
    return string
};

var a = new Horroy(1,2,3);