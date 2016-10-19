/**
 * Created by johan on 11/11/2015.
 */
import express = require("express");
import path = require("path");
const bodyParser = require('body-parser');
import index = require("./routes/index")
const plugins = require("./routes/plugin");
import {Avi} from "./avi/Avi";

var app = express();


class HttpServer {
    NodePort: number;


    constructor(port: number) {
        this.NodePort = port;
        this.configure();
    }

    private configure(): void {
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
        app.listen(this.NodePort, (err) => {
            if (err) {
                Avi.logger.error(err);
            } else {
                Avi.logger.info("Listening on port " + this.NodePort);
            }
        });
    }
}

var server = new HttpServer(8080);
server.onStart();


let avi: Avi = new Avi();


avi.init();
