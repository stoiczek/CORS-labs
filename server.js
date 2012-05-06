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

//var TMPL_SUFFIX = '.tmpl';

log.debug("Log initialized, setting up the server application");
var templates = false;

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

function setupRoutes(app, settings) {
    app.get('/', index);
    app.get('/no-cors.png', noCorsPNG);
    app.get('/cors.png', corsPNG);
    app.get('/all.css.tmpl', allCss);
    app.get('/bootstrap.min.css', bootstrapCss);
}
//
//function setupTemplates(settings) {
//    jinjs.registerExtension(TMPL_SUFFIX);
//    if (settings.reloadTemplates) {
//        return false;
//    } else {
//        return {
//            'index.html':getTemplate('index.html'),
//            'all.css':getTemplate('all.css')
//        };
//    }
//}

//function getTemplate(name) {
//    if (templates) {
//        log.d("Getting template with name: " + name + " from cache");
//        return templates[name];
//    } else {
//        log.debug("Loading template with name: " + name);
//        return require('./' + name + TMPL_SUFFIX)
//    }
//}

// ==========================================================================================
// Views
// ==========================================================================================

function index(req, res) {
    log.debug("Got get '/' request");
    res.render('index.html.jinjs', {settings:settings});
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
    log.debug("Getting the all.css.jinjs");
    res.header('Content-Type','text/css');
    res.render('all.css.jinjs',{settings:settings})
}

function bootstrapCss(req, res) {
    log.debug("Getting the bootstrap.css");
    res.sendfile('bootstrap.min.css')
}

// ==========================================================================================
// Server startup code
// ==========================================================================================

var settingsFile = process.argv.length > 2 ? process.argv[2] : __dirname + '/def_config.json';
var settings = parseSettings(settingsFile);
//templates = setupTemplates(settings);
setupRoutes(app, settings);

log.debug("Server application configured. Listening on port: " + settings.port);
app.set("view options", { layout:false });
app.set('view engine', 'jinjs');
app.disable('view cache');
app.listen(settings.port);