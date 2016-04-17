/**
* A Simple node bot to download photos from NTVBD.com
* URLs should be like:
* http://photo.ntvbd.com/entertainment/bangladesh/prova/smiling-actress-sadia-jahan-prova/1456826247.ntv
* Usage: Open the folder in terminal and run "node bot"
* Make sure that "links.txt" file is present and each line contains single link 
*
* @Author Touhidur Rahman
* @Email tanimkg@gmail.com
* Git http://github.com/tanimkg/ntvphotohunt
* Date 18 Apr 2016
**/

var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs');

// create assets dir if not available
var dir = './assets';

if (!fs.existsSync(dir)) {
    console.log("assets directory not found, creating directory ...");
    fs.mkdirSync(dir);
}

// load url-links file
fs.readFile('links.txt', function (err, data) {
    if (err) return console.log(err);
    // console.log(data.toString());
    var urlList = data.toString().split('\n');
    for (var i=0; i < urlList.length; i++) {
        if (urlList[i] == "") return console.log("Finished downloading");

        request(urlList[i], function (error, response, body) {

            if (error) return console.log("Something wrong!");

            // past this point, we have a DOM
            var $ = cheerio.load(body);
            // go to photo section and grab numbered links
            var links = $('.morePhoto a');
            links.each(function (i, elem) {
                var bits = elem.attribs.href.split("/");
                var assetId = bits[bits.length - 1].replace(".ntv", "");             // get the last bit
                var folderName = dir + '/' + bits[bits.length - 2];                             // last but one in the url

                if (!fs.existsSync(folderName)) {
                    console.log("Creating directory ...");
                    fs.mkdirSync(folderName);
                }

                var file = folderName + '/' + assetId + '.jpg';                           // so that we can later access the file at www.artstation.com/artwork/{hash_id}

                if (fs.existsSync(file)) {
                    console.log(file + " file already exists, skipping");
                } else {
                    console.log("Downloading... From: " + elem.attribs.href);
                    request("http://cdn.bn.ntvbd.com/photo/" + assetId).pipe(fs.createWriteStream(file));
                }
            });

            console.log("Finished downloading");
        });	// end request
    }
});


