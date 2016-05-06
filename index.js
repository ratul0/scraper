var express = require('express'),
    playStore = require('./routes/store');
var request = require('request');
var fs = require('fs');
var app = express();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});



//localhost:3000/app/com.infancyit.fpl
app.get('/app/:appID', playStore.getAppInfo);

//localhost:3000/keyword/usa
app.get('/keyword/:word', playStore.getSuggestion);

//localhost:3000/review/com.infancyit.fpl/pageNo
//localhost:3000/review/com.infancyit.fpl/1
app.get('/review/:appID/:page?', playStore.getReview);

app.get('/reviews/:appID',function (req, res) {
    var appID = req.params.appID;
    var pageID = 0;
    var url = "http://localhost:3000/review/"+appID+"/"+pageID
    var filename = appID.split('.').join('-').concat('.txt');

    function getReviewData(url, callback) {
        request.get({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //save in file
                var longTitle = "";
                var longData = "";
                body.forEach(function (review) {
                    longTitle += review.title;
                    longTitle += "\n";
                    longData += review.text;
                    longData += "\n";
                });
                fs.appendFile(filename, longData, function (err) {
                 if (err) {
                    res.status(400).json({ error: 'Error in Text File Writer.' })
                 }
                    console.log('Text File saved!');
                 });

                //console.log(body);
                if (body.length > 0) { // if set, this is the next URL to query
                    pageID++;
                    getReviewData("http://localhost:3000/review/"+appID+"/"+pageID, callback);
                } else {
                    callback(); //Call when we are finished
                }
            } else {
                console.log(error);
                throw error;
            }

        });
    }
    getReviewData(url, function () {
        res.json("done");
    });
});


var server = app.listen(3000, function () {
});
