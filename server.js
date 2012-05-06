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
var fs = require('fs');
var jinjs = require('jinjs');
jinjs.registerExtension('.tmpl');

log.debug("Log initialized, setting up the server application");


// ==========================================================================================
// Functions for setting things up
// ==========================================================================================

/**
 * Parses configuration file and returns hash with the settings.
 *
 * @param file file to be parsed.
 * @return {*} settings hash
 */
function parseSettings(file) {
    var content = fs.readFileSync(file, 'utf-8');
    return JSON.parse(content);
}

function setupRoutes(app) {
    app.get('/', index);
    app.get('/no-cors.png', noCorsPNG);
    app.get('/cors.png', corsPNG);
    app.get('/all.css', allCss);
}

function setupTemplates() {
    return {
        'index.html':require('./index.html.tmpl')
    };
}

// ==========================================================================================
// Views
// ==========================================================================================

function index(req, res) {
    log.debug("Got get '/' request");
    var template = templates['index.html'];
    var content = template.render({settings:settings});
    res.send(content, {'Content-Type':'text/html'}, 200);

}


function noCorsPNG(req, res) {
    log.debug("Got get '/no-cors.png' request");
    res.sendfile('Free.png')

}

function corsPNG(req, res) {
    log.debug("Got get '/cors.png' request");
    res.header('Access-Control-Allow-Origin', '*');
    res.sendfile('Free.png')

}

function allCss(req, res) {
    log.debug("Got get '/all.css' request");
    res.sendfile('all.css')

}

// ==========================================================================================
// Server startup code
// ==========================================================================================

var settingsFile = process.argv.length > 2 ? process.argv[2] : __dirname + '/def_config.json';
var settings = parseSettings(settingsFile);
var templates = setupTemplates();
setupRoutes(app, settings);

log.debug("Server application configured. Listening on port: " + settings.port);
app.listen(settings.port);