var express = require('express');
var request = require('request');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var renderPage = function (country,res,type) {
    var top = '';
    var topA = [];
    var ours = [];
    var ourstring = '';
    var ourArray = [];
    var counter = 0;
    function callbacks(error, response, body) {
        var appArray = body.split("</br>");
        for(var i=1; i<appArray.length; i++){
            var temp = appArray[i].split("appid=");
            if(temp.length>1){
                ourArray.push(temp[1].split("'")[0].split('"')[0]);
            }
        }
        fetchRank(0);
        fetchRank(50);
        fetchRank(100);
        fetchRank(150);
        fetchRank(200);
        fetchRank(250);
        fetchRank(300);
        fetchRank(350);
        fetchRank(400);
        fetchRank(450);
        fetchRank(500);
        fetchRank(550);
        fetchRank(600);
        fetchRank(650);
        fetchRank(700);
        fetchRank(750);
        fetchRank(800);
        fetchRank(850);
        fetchRank(900);
        fetchRank(950);
    }
    request(options = {
        url: "http://use14.com/s"
    }, callbacks).on('error', function(e){
        res.render('index', { title: 'Hey', message: e});
    });
    var fetchRank = function (startIndex) {
        var url = "http://marketplaceedgeservice.windowsphone.com/v9/catalog/apps?startIndex="
            +startIndex
            +"&os=8.10.12382.0&cc="
            +country
            +"&lang=en-US"
            +"&chunkSize=50&orderby="
            +type
            +"&cost=free&category=windowsphone.games";
        function callback(error, response, body) {
            var xmlArray = body.split('<a:title type="text">');
            for(var i=0; i<xmlArray.length; i++){
                var index = xmlArray[i].indexOf('</a:title>');
                for(var j=0; j<ourArray.length; j++){
                    if (xmlArray[i].indexOf(ourArray[j]) !== -1){
                        j = ourArray.length;
                        ourArray.splice(j, 1);
                        ours[i-1+startIndex] = xmlArray[i].substring(0,index)+'<br>'+'<br>';
                    }
                }
                if(i>1){
                    topA[i-1+startIndex] = (xmlArray[i].substring(0,index)+'<br>');
                }
            }
            counter++;
            if(counter==20){
                for(var j=0; j<ours.length; j++){
                    if(ours[j])
                        ourstring+=j+' '+ours[j];
                }
                for(var j=1; j<topA.length; j++){
                    top+=j+' '+topA[j];
                }
                res.render('apps', { title: 'Hey', top: top, ours: ourstring});
            }
        }
        request(options = {
            url: url,
            headers: {
                'User-Agent': 'request'
            }
        }, callback).on('error', function(e){
            res.render('apps', { title: 'Hey', top: e});
        });
    };
};

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/:country', function (req, res) {
    var country = req.params.country;
    if(country.length==3){
        renderPage(country.substring(1,3),res,"Popular");
    }
    else if(country.length==2)   {
        renderPage(country,res,"NewAndImproved");
    }
    else if(country.length==1)   {
        res.render('in');
    }
});

var server = app.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;
});