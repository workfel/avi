/**
 * Created by Arthur on 10/01/2016.
 */

var validator = require('validator');
var request = require('request');

exports.action = function (data, callback, config) {


    var key = config.googleapi.key;
    var homeAdress = config.home.adress;
    var workAdress = config.work.adress;
    var languageSelected = "fr";
    var isSent= false ;
    var destination = data.data;
    if(stringStartsWith(data.action,"Combien de temps il me faut pour aller à")
        || stringStartsWith(data.action,"Je veux aller à")){
        //cas pour aller à un endroit précisé dans la commande.
        var url = "https://maps.googleapis.com/maps/api/directions/json?origin="+homeAdress+"&destination="+destination+"&language="+languageSelected+"&key="+key;

    }else{
        //cas pour aller au travail.
        var url = "https://maps.googleapis.com/maps/api/directions/json?origin="+homeAdress+"&destination="+workAdress+"&language="+languageSelected+"&key="+key;
    }


    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("data = "+data.action);
            try{
                var response = body["routes"][0]["legs"][0]["duration"].text;
            }
            catch(err){
                response = null ;
                callback({
                    type: "tts",
                    content: "Destination inconnu."
                })
            }

            if(body["status"]== "OK"){
                if( isSent == false ){

                    if(stringStartsWith(data.action,"Combien de temps il me faut pour aller à")
                        || stringStartsWith(data.action,"Je veux aller à")){

                        if( response != null){
                            //cas pour aller à un endroit précisé dans la commande.
                            callback({
                                type: "tts",
                                content: "Avec les conditions de circulation actuelle il faut "+ response +" pour aller à "+destination+"."
                            })
                        }


                    }
                    else{
                        if( response != null) {
                            //cas pour aller au travail.
                            callback({
                                type: "tts",
                                content: "Avec les conditions de circulation actuelle il faut " + response + " pour aller au travail."
                            })
                        }
                    }

                }

            }else {
                if( response != null) {
                    if (isSent == false) {
                        callback({
                            type: "tts",
                            content: "Problème trajet. Veuillez vérifier l'adresse saisie"
                        })
                    }
                }
            }

        }
        else {
            if( isSent == false ) {
                callback({
                    type: "tts",
                    content: "Problème serveur. Veuillez vérifier votre connection internet."
                })
            }
        }
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

};


