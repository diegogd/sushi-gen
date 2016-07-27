/***
* We need to use copies to get around the fact the _components directory
* is hidden. It's hidden so as the less will compile, but this means
* we can't serve JS or fonts out of it.
***/

var fs = require('fs');

var ncp = require('ncp').ncp;

//set concurrency limit
ncp.limit = 16;

function copyFile(source, destination){
    ncp(source, destination, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log(source+' copied to '+destination+'!');
    });
}

fs.mkdir('./public/lib/', function (){

    //Bootstrap js
    fs.mkdir('./public/lib/bootstrap', function (){
        copyFile('./public/_components/bootstrap/dist/js/', './public/lib/bootstrap/');
    });

    //jQuery
    fs.mkdir('./public/lib/jquery', function (){
        copyFile('./public/_components/jquery/dist/', './public/lib/jquery/');
    });

    //Highlight.js
    fs.mkdir('./public/lib/highlight', function (){
        copyFile('./public/_components/highlightjs', './public/lib/highlight/');
    });
});

//Lato
fs.mkdir('./public/lib/lato', function (){

    fs.mkdir('./public/lib/lato/css', function (){
        copyFile('./public/_components/lato/css/', './public/lib/lato/css/');
    });

    fs.mkdir('./public/lib/lato/font', function (){
        copyFile('./public/_components/lato/font', './public/lib/lato/font/');
    });

});

//League Gothic
fs.mkdir('./public/lib/league-gothic',function (){

    copyFile('./public/_components/league-gothic/webfonts/', './public/lib/league-gothic');
});
