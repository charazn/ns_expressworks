// Solutions https://github.com/franklingu/nodeschool-solutions/tree/master/expressworks
// Expressjs 4 Cheatsheet https://github.com/azat-co/cheatsheets/tree/master/express4


// Lesson 1 HELLO WORLD
// var express = require('express');
// var app = express();
// var port = process.argv[2];

// app.get('/home', function(req, res) {
//   res.end('Hello World!')
// })
// app.listen(port)

// Lesson 2 STATIC
// var express = require('express')
// var app = express()
// var path = require('path') // Path is a node module, not an Expressjs module, https://nodejs.org/api/path.html
// var port = process.argv[2] // provides a random number each time
// var public_path = process.argv[3] // /Users/Char/.nvm/versions/node/v7.3.0/lib/node_modules/expressworks/exercises/static/public

// app.use(express.static(public_path || path.join(__dirname, 'public')))
// // https://nodejs.org/api/path.html#path_path_join_paths
// // __dirname is the name of the directory that the currently executing script resides in.
// // https://nodejs.org/docs/latest/api/globals.html#globals_dirname

// app.listen(port || 3000)

// Lesson 3 JADE
// var express = require('express')
// var app = express()
// var path = require('path') 
// var port = process.argv[2]
// var jade_path = process.argv[3] // Path to index.jade

// app.set('view engine', 'jade') // See http://expressjs.com/en/api.html#app.set
// // app.set('views', jade_path)
// app.set('views', path.join(__dirname, 'views')) // set in /views/index.jade

// app.get('/home', function (req, res) {
//   res.render('index', { date: new Date().toDateString() })
// })

// app.listen(port || 3000)

// Lesson 4 GOOD OLD FORM
// var express = require('express')
// var app = express()
// var bodyparser = require('body-parser') // https://github.com/expressjs/body-parser
// var port = process.argv[2]

// app.use(bodyparser.urlencoded({ extended: false })) 

// app.post('/form', function (req, res) {
//   res.send(req.body.str.split('').reverse().join('')) // https://expressjs.com/en/guide/routing.html
// })

// app.listen(port || 3000)

// Lesson 5 STYLISH CSS
// var express = require('express')
// var app = express()
// var path = require('path') 
// var port = process.argv[2] 
// var public_path = process.argv[3]

// app.use(require('stylus').middleware(public_path || path.join(__dirname, 'public'))) // It is important that require('stylus') comes before express.static as this loads stylus and tells it to watch for any .styl file and converts that to CSS on the fly BEFORE Express loads the static HTML file index.html
// app.use(express.static(public_path || path.join(__dirname, 'public'))) // just || 'public'

// app.listen(port || 3000)

// Lesson 6 PARAM PAM PAM
// var express = require('express')
// var app = express()
// var port = process.argv[2]

// '/message/:id/:name/:data' the params could be accessed via
// req.params.name
// req.params.data

// app.put('/message/:id', function (req, res) {
//   var id = req.params.id // capture the message id from the incoming request (remember that express code is on the server)
//   var str = require('crypto') // start the crypto processing
//     .createHash('sha1')
//     .update(new Date().toDateString() + id)
//     .digest('hex')
//   res.send(str) // returns the processed string back to the client 
// })

// app.listen(port || 3000)

// Lesson 7 WHAT'S IN QUERY
// var express = require('express')
// var app = express()
// var port = process.argv[2]

// app.get('/search', function (req, res) {
//   res.send(req.query) // send the whole query ?results=recent&type=quote&page=6 as an object {"results": "recent", "type": "quote", "page": "6"}
// })

// app.listen(port || 3000)

// Lesson 8 JSON ME
var express = require('express')
var app = express()
var fs = require('fs')
var port = process.argv[2]
var filePath = process.argv[3]
// var filePath = '/Users/Char/.nvm/versions/node/v7.3.0/lib/node_modules/expressworks/exercises/json_me/books.json'

app.get('/books', function (req, res) {
  fs.readFile(filePath, function (err, content) {
    // console.log(err) // null
    // console.log(content) // content is a file buffer. If 'utf8' was defined in the fs.readFile function, eg. fs.readFile(filePath, 'utf8', callback), content would be a string
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    try {
      var books = JSON.parse(content) // The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string. // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.json(books) // Expressjs API. Sends a JSON response. This method sends a response (with the correct content-type) that is the parameter converted to a JSON string using JSON.stringify(). The parameter can be any JSON type, including object, array, string, Boolean, or number, and you can also use it to convert other values to JSON, such as null, and undefined (although these are technically not valid JSON). 
    // http://expressjs.com/en/api.html#res.json
    // Because fs.readFile function is asynchronous, res.json() must be called within the function.
  })
})

app.listen(port || 3000)
