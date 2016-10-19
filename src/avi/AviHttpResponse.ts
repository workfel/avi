import { AviHttpResponseModel } from "./AviHttpResponseModel";
import { Avi } from "./Avi";

export class AviHttpResponse {

    compute(reponse: AviHttpResponseModel): void {

        if (!reponse.content) return;

        Avi.logger.debug("Compute response. Type : " + reponse.type);
        Avi.logger.debug("Compute response. Content : " + reponse.content);

        if (reponse.type === AviHttpResponseModel.TYPE_TTS) {
            Avi.speak(reponse.content);
        } else if (reponse.type === AviHttpResponseModel.TYPE_SONG) {
            Avi.play(reponse.content);
        }
    }
}