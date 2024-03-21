const fs = require('fs').promises

// 01

// const fileContent = fs.readFileSync("readme.txt")
// console.log(fileContent.toString())


// 02

// fs.readFile("readme.txt" , (error, content) => {
//     if(error) {
//         console.error(error)
//         return
//     }
//     console.log(content.toString())

// })
// console.log("Hello from JS")


// 03

fs.readFile("readme.txt")
.then((buffer) => console.log(buffer.toString()))
.catch(console.error)

// 04

// (async () => {
//     const buffer = await fs.readFile("readme.txt");
//     console.log(buffer.toString())

//     fs.appendFile("readme.txt", "HELLO AGAIN!"), {}
// })();



