const fs = require('fs');
const download = require('download');
const timestamp = require('time-stamp');

var downloadCSV = function (url) {
    download(url, 'rawCSV').then(() => {
        console.log(timestamp('YYYY-MM-DD HH:mm:ss'), "File Download: ", url);
    });
}

downloadCSV("https://open.stavanger.kommune.no/dataset/8f8ac030-0d03-46e2-8eb7-844ee11a6203/resource/8d13aca1-a3b3-49d5-8728-8dc310ef9f4a/download/skoler.csv");
