/**
 * Created by johan on 11/11/2015.
 */

import fs = require('fs');
import {ConfigModel} from "./ConfigModel";
import {Avi} from "../Avi";


export class Config {
    static config = null;

    load():boolean {
        let content:string = fs.readFileSync('config.json', {encoding: 'utf8'});

        try {
            var toto:string = content;

            var test = JSON.parse(toto);

            Avi.logger.debug("Config loaded " +test.home.address);

            Config.config =test;
            return true;
        } catch (e) {
            Avi.logger.error(e);
            return false;
        }

    }

    static isLoaded():boolean {
        if (Config.config === null) return false;

        return true;
    }
}