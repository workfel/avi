/**
 * Created by johan on 18/11/2015.
 */

var schedule = require('node-schedule');

exports.action = function (data, callback, config) {


    var time = data.data.trim();


    var words = time.split(" ");

    var hour = 0;
    var minute = 0;
    var second = 0;


    words.forEach(function (word, i) {

        if (word == "secondes" || word == "seconde") {
            second = words[i - 1];
        }
        else if (word == "minutes" || word == "minute") {
            minute = words[i - 1];
        }
        else if (word == "heure" || word == "heures") {
            hour = words[i - 1];
        }

    });


    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var day = new Date().getDate();


    var date = new Date(year, month, day, hour, minute, second);


    var j = schedule.scheduleJob(date, function () {
        console.log('Alarm clock called at :' + new Date());
        callback({
            type: "song",
            content: "alarm.mp3"
        });

    });


};