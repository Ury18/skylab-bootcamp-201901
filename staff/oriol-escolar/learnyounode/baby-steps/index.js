const {argv :[,,...nums]} = process
result= nums.reduce((sum,value)=> +sum + +value,0)
console.log(result)