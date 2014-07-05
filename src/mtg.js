var printf = require("printf");
var client = require("./client");
var select = require("soupselect").select;
var _ = require("lodash");

// our gracious host
var host = "http://magiccards.info";

/*  to anyone reading this - there are some MISERABLE selectors in here, and I am very sorry - 
    our gracious host has a great presentation of information but the HTML is very basic */

module.exports.expansions = function(language, callback) {
    if (!callback) {
        callback = language;
        language = "en";
    }
    client.get(host + "/sitemap.html", function(error, dom) {
        if (error) {
            callback(error);
        } else {
            var expansions = {};
            var body = select(dom, "body")[0];

            // find the anchor for that language
            var a = select(body, printf("a[name=%s]", language))[0];
            // iterate to the next <table> (soupselect doesn't support sibling selectors - https://github.com/harryf/node-soupselect/issues/7)
            var table = null;
            for (var i = body.children.indexOf(a); i < body.children.length; i++) {
                var el = body.children[i];
                if (el.name == "table") {
                    table = el;
                    break;
                }
            }
            if (table == null) {
                callback("Unable to find section for language '" + language + "'");
            }

            // grab every link in the table
            select(table, "a").forEach(function(a) {
                // code is in URL, name is child text node
                var r = /\/(.+)\/.+\.html/.exec(a.attribs.href);
                var code = r[1];
                var name = a.children[0].data;
                expansions[code] = name;
            });

            callback(false, expansions);
        }
    });
};

module.exports.cardsInExpansion = function(expansion, language, callback) {
    if (!callback) {
        callback = language;
        language = "en";
    }
    client.get(printf("%s/%s/%s.html", host, expansion, language), function(error, dom) {
        if (error) {
            callback(error);
        } else {
            var cards = [];
            // it's the first table with cellpadding
            // ...I'm sorry
            var table = select(dom, "table[cellpadding=3]")[0];
            // skip the header row
            var headerSkipped = false;
            select(table, "tr").forEach(function(tr) {
                if (!headerSkipped) {
                    headerSkipped = true;
                } else {
                    // just a matter of columns from here
                    var tds = select(tr, "td");
                    var text = _.map(tds, function(td) { return td.children ? td.children[0].data : null; });
                    var card = {
                        number: text[0],
                        name: tds[1].children[0].children[0].data,
                        type: text[2],
                        mana: text[3],
                        rarity: text[4],
                        artist: text[5]
                    };
                    cards.push(card);
                }
            });

            callback(false, cards);
        }
    });
};

module.exports.cardImageURL = function(expansion, number, language) {
    if (language == null) {
        language = "en";
    }
    return printf("%s/scans/%s/%s/%d.jpg", host, language, expansion, number);
};
