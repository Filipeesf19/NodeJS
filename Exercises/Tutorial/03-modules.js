// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

const names = require("./3.1-names");
const sayHi = require("./3.2-utils");
const data = require("./3.3-alternative-syntax")
console.log(data)
require("./3.4-mind-grenade") //the function will run although we didn' call it
sayHi("susan")
sayHi(names.john)
sayHi(names.peter)