var mtg = require("./src/mtg");
var request = require("request");
var assert = require("assert");
var _ = require("lodash");

describe("expansions", function() {
    it("should contain valid expansions", function(done) {
        mtg.expansions(function(error, expansions) {
            assert(!error);
            assert("ths" in expansions, "Theros");
            assert("mma" in expansions, "Modern Masters");
            assert("dvd" in expansions, "Duel Deck: Divine vs Demonic");
            assert("4e" in expansions, "4th Edition");
            assert("hho" in expansions, "Happy Holidays");
            done();
        });
    });
    it("should not contain invalid expansions", function(done) {
        mtg.expansions(function(error, expansions) {
            assert(!error);
            assert(!("12;3" in expansions), "sakljdhf");
            done();
        });
    });
});

describe("cardsInExpansion", function() {
    it("should contain expected cards", function(done) {
        mtg.cardsInExpansion("cns", function(error, cards) {
            assert(!error);
            var names = _.map(cards, function(card) { return card.name; });
            assert(_.contains(names, "Exploration"), "Exploration");
            assert(_.contains(names, "Squirrel Nest"), "Squirrel Nest");
            assert(_.contains(names, "Sakura-Tribe Elder"), "Sakura-Tribe Elder");
            done();
        });
    });
    it("should not contain unexpected cards", function(done) {
        mtg.cardsInExpansion("cns", function(error, cards) {
            assert(!error);
            var names = _.map(cards, function(card) { return card.name; });
            assert(!_.contains(names, "Swamp"));
            assert(!_.contains(names, "Black Lotus"));
            assert(!_.contains(names, ""));
            done();
        });
    });
});

describe("cardImageURL", function() {
    it("should build a URL for a card", function(done) {
        var url = mtg.cardImageURL("m12", "182");
        assert(url != "", "empty URL");
        request(url, function(error, response, body) {
            assert(!error, error);
            assert.equal(response.statusCode, 200);
            done();
        });
    });
});
