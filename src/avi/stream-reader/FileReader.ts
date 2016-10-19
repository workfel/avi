/**
 * Created by johan on 11/11/2015.
 */

import fs = require('fs');
import {IStreamReadListener} from "./IStreamReadListener";

export class FileReader {
    private uri:string;
    private listener:IStreamReadListener;
    private currentValue:string = "";
    private intervalToReadFile:number;


    constructor(uri:string, intervalReadFile:number = 1000) {
        this.uri = uri;
        this.currentValue = "";
        this.intervalToReadFile = intervalReadFile;
    }

    setStreamReaderListener(listenerStreamRead:IStreamReadListener) {
        this.listener = listenerStreamRead;
    }

    /**
     * Readfile and notify if the content has changed
     */
    private readFile():void {
        let content:string = fs.readFileSync("speechToText.txt", {encoding: 'utf8'});

        if (content == "") return;


        if (content != this.currentValue) {
            this.currentValue = content;
            this.listener.onValueChange(this.currentValue);
        }
    }


    start():void {
        setInterval(() => {
            this.readFile()
        }, this.intervalToReadFile);
    }
}
