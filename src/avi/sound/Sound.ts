/**
 * Created by johan on 16/11/2015.
 */
import shelljs = require('shelljs');
import {Avi} from "../Avi";


export class Sound {
    private exec = shelljs.exec;
    private isTalking:boolean = false;


    play(file:string) {

        this.exec('./play-sound.sh ' + file, (error, stdout, stderr) => {
            Avi.logger.info('stdout : ' + stdout);
            Avi.logger.error('stderr : ' + stderr);

            this.isTalking = false;
        });
    }


}