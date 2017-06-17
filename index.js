require('dotenv').config();

var Twit = require('twit');
var request = require('request');

var T = new Twit({
  consumer_key: process.env.CONS_KEY,
  consumer_secret: process.env.CONS_SEC,
  access_token: process.env.ACC_TOK,
  access_token_secret: process.env.ACC_TOK_SEC,
})

function getQuote(callback) {
  request('http://shakeitspeare.com/api/sentence', function(error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response.statusCode);
    let data = JSON.parse(body);
    console.log('body:', data.sentence);
    callback(data.sentence);
  });
}

function tweet(tweet) {
  T.post('statuses/update', { status: tweet }, function(err, data, response) {
    console.log(err);
    console.log(data);
  })
}

getQuote(tweet);
