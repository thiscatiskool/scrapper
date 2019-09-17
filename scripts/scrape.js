var request = require("request");
var cheerio = require("cheerio");

var scrape = function(cb) {
    request("https://www.wsj.com", function(err, res, body){
        var $ = cheerio.load(body);

        var articles = [];

        $("WSJTheme--story").each(function(i, element){
            var heading = $(this).children(".WSJTheme--headline").text().trim();
            var sum = $(this).children("WSJTheme--summary").text().trim();

            if(head && sum){
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat,
                };

                articles.push(dataToAdd);
            }
        });

        cb(articles);
    });
};

module.exports = scrape;