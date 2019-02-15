
//Saving the module
const fs = require('fs')

//Destructuring the path
const { argv: [, , path] } = process

//Saving the content of the file in the path and encoding it in 8-bit Unicode Transformation Format
const content = fs.readFileSync(path, { encoding: 'utf-8' })

//Counting the number of breaks by using content.match of (\n and 'g') and storing it's length.
const numOfBreaks = content.match(new RegExp('\n', 'g')).length

console.log(numOfBreaks)