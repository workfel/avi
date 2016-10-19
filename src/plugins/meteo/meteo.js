/**
 * Created by johan on 11/11/2015.
 */

var validator = require('validator');
var request = require('request');
exports.action = function (data, callback, config) {


    var weather = data.data;

    weather = weather.trim();

    var words = weather.split(" ");
    var key = "&appid=7bbccfd9ed28e24650312ff201779a89";
    var lang = "&lang=fr";
    var unit = "&units=metric";
    var city = words[0];
    if(stringStartsWith(data.action,"quel temps pour demain à")
        || stringStartsWith(data.action,"quel temps fera-t-il demain à")
        || stringStartsWith(data.action,"dis-moi la météo de demain à")){
        var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+key+lang+unit;
    }
    else {
        var url = "http://api.openweathermap.org/data/2.5/weather?q="+city+key+lang+unit;
    }

    var url
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("data = "+data.action);

            if(body["cod"]=== 200){
                console.log("Passage dans le cod ===200");
                if (stringStartsWith(data.action,"quelle est la météo à")
                    || stringStartsWith(data.action,"il fait comment aujourd'hui à")
                    || stringStartsWith(data.action,"quel temps fait t-il aujourd'hui à")
                    || stringStartsWith(data.action,"dis moi la météo à")){

                        var etat = body["weather"][0].description;
                        console.log("body[] = "+body);
                        var temperature = body["main"].temp;
                        callback({
                            type: "tts",
                            content: "Il fait "+ etat + ". La température actuel est de "+temperature+" degrés."
                        })


                }

                else if (stringStartsWith(data.action,"fait il du vent à")){

                    var etat = body["weather"][0].description;
                    var windSpeed = body["wind"].speed;
                    callback({
                        type: "tts",
                        content: "Le vent souffle à "+ windSpeed + " kilomètres à l'heure actuellement sur " + city
                    })
                }

                else if (stringStartsWith(data.action,"quel temps pour demain à")
                    || stringStartsWith(data.action,"quel temps fera-t-il demain à")
                    || stringStartsWith(data.action,"dis-moi la météo de demain à")){

                    var etat = body["weather"][0].description;
                    console.log("body[] = "+body);
                    var temperature = body["main"].temp;
                    callback({
                        type: "tts",
                        content: "Il fait "+ etat + ". La température actuel est de "+temperature+" degrés."
                    })


                }
                else {
                    console.log("Command not found.");
                }
            }else {

                callback({
                    type: "tts",
                    content: "La ville demandé n'existe pas."
                })
            }

        }
        callback({
            type: "tts",
            content: "Problème avec la clé d'API. Veuillez réessayer ultérieurement."
        })
    })
    /**
     * To compare if the beginning of the string matchs with the action.
     * @param string
     * @param prefix
     * @returns {boolean}
     */
    function stringStartsWith (string, prefix) {
        return string.slice(0, prefix.length) == prefix;
    }
   // console.log("[meteo.js] request = " + url);

        /*callback({
            type: "tts",
            content: city
        })*/



};

