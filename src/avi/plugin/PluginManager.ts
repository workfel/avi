/**
 * Created by johan on 11/11/2015.
 */
import fs = require("fs");
import path= require("path");
import {PluginModel} from "./PluginModel";
import {IPluginLoaded} from "./IPluginLoaded";
import {ConfigModel} from "../config/ConfigModel";
import {Config} from "../config/Config";
import {Avi} from "../Avi";

export class PluginManager {
    private listener:IPluginLoaded;
    private config:ConfigModel;


    constructor() {
        this.config = Config.config;
    }

    setOnPluginLoadedListener(listener:IPluginLoaded) {
        this.listener = listener;
    }

    readPluginFolder():void {

        let plugins:Array<PluginModel> = new Array<PluginModel>();

        fs.readdir(this.config.plugin.folder, (err, files)=> {
            if (err) {
                Avi.logger.error("Erreur dans le chargement des plugins : "+ err);
            } else {
                files.forEach((file) => {
                    let content:string = fs.readFileSync(path.join(this.config.plugin.folder, file, 'config.json'), {encoding: 'utf8'});

                    let plugin:PluginModel = JSON.parse(content);

                    plugins.push(plugin);
                });

                this.listener.onPluginsLoaded(plugins);
            }
        });

    }

}