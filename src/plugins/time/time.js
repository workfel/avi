/**
 * Created by johan on 12/11/2015.
 */
exports.action = function (data, callback, config) {

    var date = new Date();

    callback({
        type: "tts",
        content: "Il est " + date.getHours() + " heures " + date.getMinutes()
    })

};