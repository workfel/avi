import {ISentence} from "./ISentence";
import {Sentence} from "./Sentence";
/**
 * Created by johan on 11/11/2015.
 */
export class Meteo extends Sentence {
    
    constructor() {
        super([
            'quelle est la météo',
            'météo aujourdh\'ui',
            'dis moi la météo',
        ]);


    }
}