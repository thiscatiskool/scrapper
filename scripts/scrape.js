var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
    request("http://www.wsj.com", function(err, res, body){
        var $ = cheerio.load(body);

        var articles = [];

        $(".WSJTheme--story--").each(function(i, element){
            var head = $(this).children(".WSJTheme--headline--").text().trim();
            var sum = $(this).children(".WSJTheme--summary--").text().trim();

            var dataToAdd = {
                headline: head,
                summary: sum,
            };
            /*
            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat,
                };
                */

                articles.push(dataToAdd);
            
        });

        cb(articles);
    });
};

module.exports = scrape;