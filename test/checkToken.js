var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('bin/www');
var mongoose = require("lib/mongoose");
var crypto = require('../crypto.js');

var should = chai.should();

chai.use(chaiHttp);

describe('checkToken', function () {
    var globalUser;

    before(function(done) {
        var User = require('models/user').User;

        User.findOne({email: 'vinohradov@gmail.com'}).exec(function(err, user){
            globalUser = user.toJSON();
            done()
        })
    });

    describe('/GET *', function () {
        it('it should return status 200 if user has valid token', function (done) {
            var date = +new Date();

            chai.request(server)
                .get('/practices')
                .set({
                    'Authorization': 'Bearer ' + crypto.encrypt(globalUser.token + date),
                    'From': 'vinohradov@gmail.com',
                    'Now': date
                })
                .end(function(err,res){
                    res.should.have.status(200);
                    done()
                });
        });

        it('it should return status 403 if user date was expired', function (done) {
            var expirationTime = 4000;
            var date = +new Date() - expirationTime;

            chai.request(server)
                .get('/practices')
                .set({
                    'Authorization': 'Bearer ' + crypto.encrypt(globalUser.token + date),
                    'From': 'vinohradov@gmail.com',
                    'Now': date
                })
                .end(function(err,res){
                    res.should.have.status(403);
                    done()
                });
        });

        it('it should return status 403 if user provided wrong email', function (done) {
            var date = +new Date();
            var wrongEmail = 'vinohradovs@gmail.com';

            chai.request(server)
                .get('/practices/1/technologies')
                .set({
                    'Authorization': 'Bearer ' + crypto.encrypt(globalUser.token + date),
                    'From': wrongEmail,
                    'Now': date
                })
                .end(function(err,res){
                    res.should.have.status(403);
                    done()
                });
        });

        it('it should return status 403 if user provided wrong token', function (done) {
            var date = +new Date();
            var wrongToken = globalUser.token + 'asd';

            chai.request(server)
                .get('/')
                .set({
                    'Authorization': 'Bearer ' + crypto.encrypt(wrongToken + date),
                    'From': 'vinohradov@gmail.com',
                    'Now': date
                })
                .end(function(err,res){
                    res.should.have.status(403);
                    done();
                })
        });
    });
});