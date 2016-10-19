import {Speak} from "./speak/Speak";
import {ISpeechToTextListener} from "./speech-to-text/ISpeechToTextListener";
import {SpeechToTextService} from "./speech-to-text/SpeechToTextService";
import {Config} from "./config/Config";
import {PluginManager} from "./plugin/PluginManager";
import {SentenceComputer} from "./sentence/SentenceComputer";
import {Sound} from "./sound/Sound";
import {SentenceHistory} from "./sentence/SentenceHistory";
import {AviLogger} from "./logger/AviLogger";
import {AviWakeUp} from "./wake-up/AviWakeUp";
/**
 * Created by johan on 11/11/2015.
 */


export class Avi implements ISpeechToTextListener {
    private sTTService:SpeechToTextService = new SpeechToTextService(this);
    private config:Config = new Config();
    private sentenceComputer:SentenceComputer = new SentenceComputer();
    private sentenceHistory:SentenceHistory = new SentenceHistory();
    static logger:AviLogger = new AviLogger();
    private aviWakeUp:AviWakeUp = new AviWakeUp();

    constructor() {

    }

    init(language:string = "fr"):boolean {


        let loaded:boolean = this.config.load();

        if (!loaded) {
            Avi.logger.error("Erreur a chargement du fichier de configuration: config.json");
            return false;
        }


        this.aviWakeUp.start();

        this.sentenceComputer.init();

        this.sentenceHistory.loadSentences();

        this.sTTService.startRead();


        return true;
    }

    onTextPrinted(text:string) {
        Avi.logger.debug("on text changed: " + text);

        this.sentenceComputer.compute(text);
    }


    static speak(text:string):string {
        if (text) {
            Speak.tts(text);
            return text;
        } else {
            let error:string = 'Il faut minimun un mot pour pouvoir faire du text to speech';

            return "Erreur :" + error;
        }

    }

    static play(content:string):void {
        if (!content) {
            Avi.logger.error("Play need a file");
            return;
        }
        //play sound
        let sound:Sound = new Sound();
        sound.play(content);
    }
}