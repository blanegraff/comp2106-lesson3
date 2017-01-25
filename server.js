// link the contect
let connect = require('connect');
let url = require('url');
let accounting = require('accounting');

// create a new connect object
let app = connect();

// hello "page"
let hello = function(req, res, next) {
  res.end('Hello, this now restarts with Nodmon');
};

// goobye "page"
let goodbye = function(req, res, next) {
  res.end('Goodbye')
};

// index "page"
let index = function(req, res, next) {
  res.end('This is the home page')
};

// tax calculator "page"
let tax = function(req, res, next) {

  // get the full querystring ?amount=1000
  let qs = url.parse(req.url, true).query;

  // get the amount value from querystring
  let amount = qs.amount;

  // calculate tax and total
  let hst = amount * .13;
  let total = parseFloat(hst) + parseFloat(amount);

  // display all
  res.end('<h1>Tax Calculator</h1>' +
    'Amount:' + accounting.formatMoney(amount) + '<br />' +
    'HST:' + accounting.formatMoney(hst) + '<br />' +
    'Total:' + accounting.formatMoney(total) );
};

// 404 function
let notFound = function(req, res, next) {
  res.writeHead(404);
  res.end('Not Found')
};

// json api simulation
let api = function(req, res, next) {
  // create json object
  let person = JSON.stringify({
    "name": "Joe",
    "age": 29,
    "nationality": "Canadian"
  });
  // set response as json rather then text or html
  res.writeHead(200, { "Content-Type": "application/json"});
  // return the json variable
  res.end(person);
};

// map the url's to the correct vitural pages
app.use('/hello', hello);
app.use('/goodbye', goodbye);
app.use('/tax', tax);
app.use('/api', api);
app.use('/', index);
// app.use(notFound);

// start the connect http server
let port = process.env.PORT || 3000;
app.listen(port);
console.log('Connect server running on port 3000');
