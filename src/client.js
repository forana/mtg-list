var request = require("request");
var htmlparser = require("htmlparser");

module.exports.get = function(url, callback) {
    request(url, function(error, response, body) {
        if (error) {
            callback(error);
        } else if (response.statusCode != 200) {
                callback([http.statusCode, body]);
        } else {
            var parser = new htmlparser.Parser(new htmlparser.DefaultHandler(callback));
            parser.parseComplete(body);
        }
    });
};
