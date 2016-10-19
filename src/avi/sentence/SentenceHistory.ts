import {SentenceModel} from "./SentenceModel";
import fs = require('fs');
import {Config} from "../config/Config";
import {SentenceHistoryModel} from "./SentenceHistoryModel";
import {Avi} from "../Avi";

/**
 * Created by johan on 16/11/2015.
 */
export class SentenceHistory {
    static sentences:string[] = [];


    loadSentences() {
        this.resetSentences();

        let listSentences:SentenceHistoryModel = this.readFiles();

        SentenceHistory.sentences = listSentences.sentences;

        Avi.logger.debug(SentenceHistory.sentences);
    }

    getLastSentence():SentenceModel {
        let sentence:SentenceModel = new SentenceModel();

        sentence.sentence = SentenceHistory.sentences[SentenceHistory.sentences.length - 1];
        return sentence;
    }

    addSentence(newSentence:string):boolean {
        let contentFiles = {
            "sentences": []
        };
        this.updateSentences();
        SentenceHistory.sentences.push(newSentence);

        contentFiles.sentences = SentenceHistory.sentences;

        fs.writeFileSync(Config.config.sentence.fileHistory, JSON.stringify(contentFiles), {encoding: 'utf8'});


        this.loadSentences();

        return true;

    }


    resetSentences():boolean {
        SentenceHistory.sentences = [];
        if (SentenceHistory.sentences.length === 0)
            return true;
        return false;
    }


    private updateSentences() {
        if (SentenceHistory.sentences.length == 10) {
            SentenceHistory.sentences.shift();
        }
    }


    private readFiles():SentenceHistoryModel {
        if (!Config.isLoaded()) return null;

        let content:string = fs.readFileSync(Config.config.sentence.fileHistory, {encoding: 'utf8'});

        let sentences:SentenceHistoryModel = JSON.parse(content);

        return sentences;

    }

}