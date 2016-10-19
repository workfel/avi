
var lame = require('lame');
var Speaker = require('speaker');
var Spotify = require('spotify-web');

exports.action = function (data, callback, config) {

    //var uri = process.argv[2] || 'spotify:track:6tdp8sdXrXlPV6AZZN2PE8';
    var username = "3f315ad79d39471899782b5ac94463d1";//process.env.USERNAME;
    var password = "c57311e00c404d04abffeff6a2147ad3";//process.env.PASSWORD;
    console.log("called");

    Spotify.login(username, password, function (err, spotify) {
        if (err) throw err;

        spotify.search(data.data, function (err, xml) {
            if (err) throw err;
            spotify.disconnect();

            var parser = new xml2js.Parser();
            parser.on('end', function (data) {
                uri = JSON.stringify(data, null, 2);
                // first get a "Track" instance from the track URI
                spotify.get(uri, function (err, track) {
                    if (err) throw err;
                    console.log('Playing: %s - %s', track.artist[0].name, track.name);

                    // play() returns a readable stream of MP3 audio data
                    track.play()
                        .pipe(new lame.Decoder())
                        .pipe(new Speaker())
                        .on('finish', function () {
                            spotify.disconnect();
                        });
                });
            });
            //parser.parseString(xml);
        });
    });
};