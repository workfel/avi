/**
 * Created by johan on 11/11/2015.
 */
import express = require("express");
import path = require("path");
import bodyParser = require('body-parser');
import index = require("./routes/index")
import plugins = require("./routes/plugin")
import {Avi} from "./avi/Avi";
import {History} from "./src/routes/history";

var app = express();


class HttpServer {
    NodePort:number;


    constructor(port:number) {
        this.NodePort = port;
        this.configure();
    }

    private configure():void {
        app.use(express.static(path.join(__dirname, 'public')));
        //app.set('views', __dirname + '/views');
        //app.set('view engine', 'jade');
        app.use(bodyParser.urlencoded({'extended': 'true'}));            // parse application/x-www-form-urlencoded
        app.use(bodyParser.json());
        app.get('/', index.index);
        //app.use('/history', new History());
        app.use('/plugin', plugins);
    }

    onRequest() {

    }

    onStart() {
        app.listen(this.NodePort, this.NodePort);
    }
}

var server = new HttpServer(3000);
server.onStart();

Avi.logger.info("HTTP server running at http://localhost:3000/");

let avi:Avi = new Avi();


avi.init();
