/**
 * Created with PyCharm.
 * User: ted
 * Date: 4/29/12
 * Time: 9:03 PM
 * To change this template use File | Settings | File Templates.
 */

var express = require('express');
var app = express.createServer();
var log4js = require('log4js');
var log = log4js.getLogger();
log.debug("Log initialized, setting up the server application");

app.get('/', function (req, res) {
    log.debug("Got get '/' request");
    res.sendfile('index.html')

});

app.get('/no-cors.png', function (req, res) {
    log.debug("Got get '/no-cors.png' request");
    res.sendfile('Free.png')

});

app.get('/cors.png', function (req, res) {
    log.debug("Got get '/cors.png' request");
    res.header('Access-Control-Allow-Origin', '*');
    res.sendfile('Free.png')

});

app.get('/all.css', function (req, res) {
    log.debug("Got get '/all.css' request");
    res.sendfile('all.css')

});

log.debug("Server app configured, starting.");

app.listen(8080);