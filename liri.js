require("dotenv").config();

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

switch (command) {

  case "my-tweets": {

    break;
  }
  case "spotify-this-song": {

    songSearch();
    
    break;
  }
  case "movie-this": {

    movieSearch();

    break;
  }
  case "do-what-it-says": {

    break;
  }

};

function songSearch() {

  var trackName = process.argv[3];

  spotify.search({ type: 'track', query: trackName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data);

  });

};

function movieSearch() {

  var movieName = process.argv[3];

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {

      console.log("Release Year: " + JSON.parse(body).Year);
    }

  });

};
