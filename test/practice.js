var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('app');
var should = chai.should();
var assert = require('assert');
var mongoose = require("lib/mongoose");

chai.use(chaiHttp);

describe('Books', function () {
    //beforeEach(function(done){ });

    describe('/GET book', function () {
        it('it should GET all the books', function (done) {
            chai.request(server)
                .get('/practices')
                .end(function(err,res){
                    res.should.have.status(403);
                    assert.equal(-1, [1,2,3].indexOf(4));
                    done()
                })
        })
    });
});