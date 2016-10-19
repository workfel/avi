/**
 * Created by johan on 11/11/2015.
 */

import {Contains} from 'linq-ts';

export class Sentence {
    sentenceLike:string[];

    constructor(listSentenceLike:string[]) {
        this.sentenceLike = listSentenceLike;
    }

    compute(sentence:string) {
        let sentenceExist:boolean = this.sentenceLike.Contains(sentence);

        return sentenceExist;
    }
}