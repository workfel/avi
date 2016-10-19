/**
 * Created by johan on 18/11/2015.
 */

import shelljs = require('shelljs');
import fs = require('fs');
import {AviLogger} from "../logger/AviLogger";
import {Avi} from "../Avi";

export class AviWakeUp {
    private exec = shelljs.exec;
    private static WORD_WAKE_UP:string = "__AVI__";

    private lastWakeUp:number;


    constructor() {
        this.lastWakeUp = 0;
    }

    start():void {
        //this.exec('./runContinuous.sh', (error, stdout, stderr) => {
        var child = this.exec('runContinuous.bat', {async: true});

        child.stdout.on('data', (stdout) => {
            /* ... do something with data ... */

            Avi.logger.debug('stdout : ' + stdout);
            //console.log('stderr : ' + stderr);

            if (stdout.indexOf(AviWakeUp.WORD_WAKE_UP) != -1) {


                let sentence:string = stdout.substring(AviWakeUp.WORD_WAKE_UP.length, stdout.length);

                //Avi.logger.debug('WAKEUP: '+ sentence);

                if (sentence.toLowerCase().trim() == "ok avi" ||
                    sentence.toLowerCase().trim() == "okey avi") {
                    this.updateLastWakeUpTime();
                } else {

                    if (this.isWakeUp()) {

                        //WRITE ON FILE
                        this.updateSentenceToFile(sentence);
                    }
                }

                //WAKE UP AVI
                //if (this.lastWakeUp == 0 ) {
                //    this.updateLastWakeUpTime();
                //
                //}
            }
        });
        //, (error, stdout, stderr) => {
        //
        //    });
    }

    private updateSentenceToFile(sentence:string) {
        fs.writeFileSync("speechToText.txt", sentence, {encoding: 'utf8'});
    }

    private isWakeUp():boolean {
        let currentTime:number = new Date().getTime();

        if (currentTime <= (this.lastWakeUp + 2000)) {//+ 2sec
            return true;
        }

        return false;
    }

    private updateLastWakeUpTime() {
        this.lastWakeUp = new Date().getTime();
    }
}