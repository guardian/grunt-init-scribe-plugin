var chai = require('chai');
var webdriver = require('selenium-webdriver');
var helpers = require('scribe-test-harness/helpers');

var expect = chai.expect;

var when = helpers.when;
var given = helpers.given;
var givenContentOf = helpers.givenContentOf;

var scribeNode;
beforeEach(function() {
  scribeNode = helpers.scribeNode;
});

describe('{%= name  %}', function(){
    /* This test was generated by the grunt-init plugin */
    givenContentOf("<p>some content</p>", function () {
        it('should fail the test', function() {
            expect(true).to.be(false);
        });
    });
});
