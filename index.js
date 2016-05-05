var express = require('express'),
    playStore = require('./routes/store');
var app = express();

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});




app.get('/app/:appID', playStore.getAppInfo);


var server = app.listen(3000, function () {
});
