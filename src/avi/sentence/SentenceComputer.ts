import {Sentence} from "./Sentence";
import {PluginModel} from "../plugin/PluginModel";
import {PluginManager} from "../plugin/PluginManager";
import {IPluginLoaded} from "../plugin/IPluginLoaded";
import request = require('request');
import clj_fuzzy = require('clj-fuzzy');
import {AviHttpResponseModel} from "../AviHttpResponseModel";
import {AviHttpResponse} from "../AviHttpResponse";
import {SentenceHistory} from "./SentenceHistory";
import {Avi} from "../Avi";
import {Config} from "../config/Config";

/**
 * Created by johan on 11/11/2015.
 */
export class SentenceComputer implements IPluginLoaded {


    private static plugins:Array<PluginModel> = new Array<PluginModel>();
    private sentence:Sentence;
    private config:Config = new Config();

    constructor() {
    }

    init() {
        let plugingManager:PluginManager = new PluginManager();
        plugingManager.setOnPluginLoadedListener(this);
        plugingManager.readPluginFolder();
    }

    compute(sentence:string) {

        var pluginFinded:PluginModel = null;
        let data:string = null;
        let finded:boolean = false;
        let action:string = null;
        let score:number = 0;
        let confidence:number = 0.3;

        sentence = sentence.trim();

        SentenceComputer.plugins.forEach((plugin:PluginModel)=> {

            plugin.sentences.forEach(s=> {
                if (finded) return false;

                var levens = clj_fuzzy.metrics.levenshtein(sentence, s);
                levens = 1 - (levens / s.length);
                if ((levens > score && levens > confidence) ||
                    sentence.trim().indexOf(s.trim()) != -1) {

                    // if () {
                    pluginFinded = plugin;

                    action = s;
                    data = sentence.substr(s.length, sentence.length);
                    //console.log(data);
                    finded = true;
                    return true;
                }
            });
        });

        if (pluginFinded) {
            Avi.logger.debug('Plugin: "' + pluginFinded.name + '" called with sentence: "' + sentence + '"');
            Avi.logger.debug('Action: ' + action);
            Avi.logger.debug('data: ' + data);
            Avi.logger.debug('URL : ' + pluginFinded.url);
            //make request

            let query:string = "?path=plugins/" + pluginFinded.folder + "&script=" + pluginFinded.script;

            query += "&action=" + action;
            query += "&sentence=" + sentence;
            query += "&data=" + data;
            query += "&config=" + JSON.stringify(Config.config);


            let sentenceHistory:SentenceHistory = new SentenceHistory();
            sentenceHistory.addSentence(sentence);


            let url:string = 'http://localhost:3000/plugin/' + pluginFinded.url + query;

            Avi.logger.debug('Request : ' + url);

            request(url, function (error, response, body) {

                if (!error && response.statusCode == 200) {

                    let aviResponseModel:AviHttpResponseModel = JSON.parse(body);

                    let aviResponse:AviHttpResponse = new AviHttpResponse();
                    aviResponse.compute(aviResponseModel);
                }
            })
        }
    }


    onPluginsLoaded(plugins:Array<PluginModel>) {
        SentenceComputer.plugins = plugins;
    }
}