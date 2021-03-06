var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('bin/www');
var mongoose = require("lib/mongoose");
var crypto = require('../crypto.js');

var should = chai.should();

chai.use(chaiHttp);

describe('Practices', function () {
    var globalUser;

    function getAuthorizationHeaders() {
        var date = new Date();

        return {
            'Authorization': 'Bearer ' + crypto.encrypt(globalUser.token + date),
            'From': 'vinohradov@gmail.com',
            'Now': date
        }
    }

    before(function(done) {
        var User = require('models/user').User;

        User.findOne({email: 'vinohradov@gmail.com'}).exec(function(err, user){
            globalUser = user.toJSON();
            done()
        })
    });

    describe('/GET practices', function () {
        it('it should return array with 5 practices', function (done) {
            chai.request(server)
                .get('/practices')
                .set(getAuthorizationHeaders())
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(5);
                    res.body.total.should.be.eql(6);
                    done()
                });
        });


        it('it should return array with 1 practice', function (done) {
            chai.request(server)
                .get('/practices?page=2')
                .set(getAuthorizationHeaders())
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(1);
                    res.body.total.should.be.eql(6);
                    done()
                });
        });

        it('it should return empty array', function (done) {
            chai.request(server)
                .get('/practices?page=3')
                .set(getAuthorizationHeaders())
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(0);
                    res.body.total.should.be.eql(6);
                    done()
                });
        });
    });
});