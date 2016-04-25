'use strict';
// Other Libraries
var path = require('path');
var koa = require('koa');

// Koa Libraries
var bodyParser = require('koa-bodyparser');
var serve = require('koa-static');

var Router = require('koa-router');
var router = new Router();

var db = require('monk')('localhost/mydb');
var users = db.get('users');
users.insert({ name: 'Tobi', bigdata: {} });

users.find({}, function(err, doc){
  console.log(`Error: ${err}`);
  console.log(`Doc: ${doc}`);
})
// The app
var app = koa();

// KOA Configs
app.use(bodyParser());
app.use(serve(path.normalize(__dirname + '/..') + '/client'));

// Load API
router.get('/api/user/',  function*(next){
  this.body = 'hello';
  yield next;
})
app.use(router.routes());

console.log(`Process: ${process.env.PORT}`)
app.listen(process.env.PORT || 8080);
