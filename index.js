var express = require('express'),
    playStore = require('./routes/store');
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


var server = app.listen(3000, function () {
});
