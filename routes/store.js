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

exports.getSuggestion = function (req, res) {
    var keyword =  req.params.word;
    gplay.suggest(keyword)
        .then(function(data){

            res.json(data);
            //console.log('Retrieved application: ' + app.title);
        })
        .catch(function(e){
            res.status(400).json({ error: 'Not found.' })
            //console.log('There was an error fetching the application!');
        });
}

exports.getReview = function(req, res){
    var appID = req.params.appID;
    var pageID = req.params.page;

    gplay.reviews({
        appId: appID,
        page: 0 || pageID,
        sort: gplay.sort.NEWEST
    })
        .then(function(reviews){

            res.json(reviews);
            console.log('Retrieved application: ' + reviews.length);
        })
        .catch(function(e){
            res.status(400).json({ error: 'Not found.' })
            //console.log('There was an error fetching the application!');
        });
}