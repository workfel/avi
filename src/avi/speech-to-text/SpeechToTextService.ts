import {ISpeechToTextListener} from "./ISpeechToTextListener";
import {IStreamReadListener} from "../stream-reader/IStreamReadListener";
import {FileReader} from "../stream-reader/FileReader";


export class SpeechToTextService implements IStreamReadListener {

    listener:ISpeechToTextListener;
    streamReader:FileReader = new FileReader("speechToText.txt");

    constructor(listener:ISpeechToTextListener) {
        this.listener = listener;
    }

    startRead() {
        this.streamReader.setStreamReaderListener(this);
        this.streamReader.start();
    }


    onValueChange(text:string) {
        this.listener.onTextPrinted(text);
    }

}