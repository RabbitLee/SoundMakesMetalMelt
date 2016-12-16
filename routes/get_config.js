/**
 * Created by RabbitLee on 15/12/2016.
 */

var express = require('express');
var request = require("request");
var jsSHA = require('jssha');

// var config = require('../wechat_verify/generate_config');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    appId = 'wxbe363aa018d662a6';
    appSercet = '200eba49dc6e3675825262a7d74a02c2';

    console.log('appId: ' + appId);

    var access_token;
    var jsapi_ticket;
    var config;

    url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appId + '&secret=' + appSercet;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var parseData = JSON.parse(body);
            access_token = parseData.access_token;
            console.log('access_token: ' + access_token);

            url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi';
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var parseData = JSON.parse(body);
                    jsapi_ticket = parseData.ticket;
                    console.log('jsapi_ticket: ' + jsapi_ticket);

                    var raw = function (args) {
                        var keys = Object.keys(args);
                        keys = keys.sort()
                        var newArgs = {};
                        keys.forEach(function (key) {
                            newArgs[key.toLowerCase()] = args[key];
                        });

                        var string = '';
                        for (var k in newArgs) {
                            string += '&' + k + '=' + newArgs[k];
                        }
                        string = string.substr(1);
                        return string;
                    };
                    config = {
                        jsapi_ticket: jsapi_ticket,
                        // jsapi_ticket: '345df4ref43refd',
                        nonceStr: Math.random().toString(36).substr(2, 15),
                        timestamp: parseInt(new Date().getTime() / 1000) + '',
                        url: 'http://rabbit.neverstar.top/'
                    };
                    var string = raw(config);
                    var shaObj = new jsSHA('SHA-1', 'TEXT');
                    shaObj.update(string);
                    config.string1 = string;
                    config.signature = shaObj.getHash('HEX');
                    console.log('config: ');
                    console.log(config);

                    res.send(config);
                }
            })

        }
    })

});

module.exports = router;
