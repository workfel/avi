/**
 * Created by johan on 11/11/2015.
 */
const shelljs = require('shelljs');
const googleTTS = require('google-tts-api');

export class Speak {
    private static exec = shelljs.exec;
    private static mQueueTts: string[] = [];
    private static isTalking: boolean = false;


    static tts(text: string) {
        if (!text) return;
        Speak.mQueueTts.push(text);
        this.speak();
    }


    static speak(): void {
        if (this.isTalking) return;

        if (Speak.mQueueTts.length <= 0) return;

        this.isTalking = true;
        googleTTS(Speak.mQueueTts[0], "fr", 5)   // speed normal = 1 (default), slow = 0.24
            .then((url) => {
                console.log(url); // https://translate.google.com/translate_tts?...
                url = url.replace("https://translate.google.com/", " http://translate.google.com/");

                this.exec('./speech.sh ' + '"' + url + '"', (error, stdout, stderr) => {
                    console.log('stdout : ' + stdout);
                    console.log('stderr : ' + stderr);

                    Speak.mQueueTts.shift();
                    this.isTalking = false;
                    this.speak();
                });
            })
            .catch(function (err) {
                console.error(err.stack);
            });


    }

}