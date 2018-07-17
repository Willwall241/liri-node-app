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
    getTweets();
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

function getTweets() {

  var params = { screen_name: 'JwallerU' };

  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {

      for (var i = 0; i < tweets.length; i++) {

        console.log("----Tweet" + (i+1) + "-----------------");
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
        console.log("-----------------------------------");

      }

    }
  });



}

function songSearch() {

  var trackName = "";

  for (var i = 3; i < process.argv.length; i++) {

    trackName = trackName.trim() + " " + process.argv[i];

  }
  console.log(trackName);

  spotify.search({ type: 'track', query: trackName })
    .then(function (response) {

      console.log(response);

    })
    .catch(function (err) {

      console.log(err);

    })

};

function movieSearch() {

  var movieName = "";

  if (process.argv[3]) {

    for (var i = 3; i < process.argv.length; i++) {

      movieName = movieName.trim() + " " + process.argv[i];

    }
    console.log(movieName);
  }
  else {
    movieName = "Mr. Nobody";
  }
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {

      console.log("----Movie--------------------------------")
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("-----------------------------------------")

    }

  });

};
