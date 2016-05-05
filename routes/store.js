var gplay = require('google-play-scraper');
exports.getAppInfo = function(req, res){
    var appID = req.params.appID;
    gplay.app({appId: appID})
        .then(function(app){

            res.json(app);
            //console.log('Retrieved application: ' + app.title);
        })
        .catch(function(e){
            res.status(400).json({ error: 'Not found.' })
            //console.log('There was an error fetching the application!');
        });
}