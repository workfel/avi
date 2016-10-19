/**
 * Created by johan on 11/11/2015.
 */
var router = require('express').Router();
var pwd = require('path');


router.get('/:name', function (req, res) {
    var pluginName = req.params.name;


    var data = req.query;

    console.log(data);

    var plugin = getModule(data.path, data.script);

    console.log('plugin : ' + pluginName);
    console.log('params : ' + JSON.stringify(req.body));

    if (!plugin) {
        console.log('Error in load plugin :' + pluginName);
        res.send(400);
        return;
    }

    plugin.action(data, function (response) {
        //console.log(response);

        res.send(response);
        //_actionPluginResponse(res, response);
    }, JSON.parse(data.config));


});


var getModule = function (pathPlugin, script) {
    var module = false;
    var path = false;

    path = pwd.normalize(pwd.join(__dirname, '..', pathPlugin, script));
    //delete require.cache[require.resolve(module)]
    //return require(module)

    module = requireUncached(path);
    //module = require(path);


    //initModule(module);
    //if (!module) {
    //    return false;
    //}

    return module;
};

var initModule = function (module, name) {
    try {
        if (!module) {
            return;
        }

        if (module.initialized) {
            return;
        }
        module.initialized = true;

        console.log('info', 'initModule: ', name);
        if (!module.init) {
            return;
        }

    } catch (ex) {
        console.log('warn', 'initModule: ' + ex.message);
    }
};


function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}
module.exports = router;