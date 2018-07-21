
// Add all required packages and files
require("dotenv").config();
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");

//Get Twiter and Spotify APi keys from file
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Variable for user input/switch statement control
var command = process.argv[2];

//Switch Statement based on user input
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

    read();

    break;
  }

};

//Function to request tweets from twitter
function getTweets() {

  //Twitter Parameter: Screen_name
  var params = { screen_name: 'JwallerU' };

  //Twitter Get object
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    
    // console.log(tweets.length);

    //Variable for Tweet number counter
    var n = 1;

    //If statement control for if there is no error
    if (!error) {
      
      //For loop to console log each tweet
      for (var i = tweets.length -1 ; i >= 0; i--) {
        
        console.log("----Tweet-" + n + "-----------------");
        console.log(tweets[i].created_at);
        console.log(tweets[i].text);
        console.log("-----------------------------------");

        //write function callback to log each output to log.txt file
        write("\n" + "--Tweet-" + n + "-----------------------------------------------" + "\n" +
        "\n" + tweets[i].created_at + "\n" +
        "\n" + tweets[i].text + "\n" +
          "-------------------------------------------------------")
        n++;
      }

    }
  });



}

//Spotify song search function 
function songSearch() {


  var trackName = input();

  spotify.search({ type: 'track', query: trackName, limit: 1 }, function (err, data) {


    if (!err) {
      for (var i = 0; i < data.tracks.items.length; i++) {

        console.log("--Spotify-----------------------------------------------");
        console.log("Artist: " + data.tracks.items[i].artists[i].name);
        console.log("Song: " + data.tracks.items[i].name);
        console.log("Song Link: " + data.tracks.items[i].external_urls.spotify);
        console.log("Album: " + data.tracks.items[i].album.name);
        console.log("Album Link: " + data.tracks.items[i].album.external_urls.spotify);
        console.log("-------------------------------------------------------");
        // console.log(JSON.stringify(data.tracks.items[i], null, 2));
        write("\n" + "--Spotify-----------------------------------------------" + "\n" +
          "Artist: " + data.tracks.items[i].artists[i].name + "\n" +
          "Song: " + data.tracks.items[i].name + "\n" +
          "Song Link: " + data.tracks.items[i].external_urls.spotify + "\n" +
          "Album: " + data.tracks.items[i].album.name + "\n" +
          "Album Link: " + data.tracks.items[i].album.external_urls.spotify + "\n" +
          "-------------------------------------------------------");

      }
    }
    else {
      console.log(err);
    }
  });

};

function movieSearch() {

  var movieName = input();
  console.log(movieName);

  if (!movieName) {

    movieName = "Mr. Nobody";

  }

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {

      console.log("----Movie--------------------------------");
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("-----------------------------------------");

      write("\n" + "--Movie-----------------------------------------------" + "\n" +
        "Title: " + JSON.parse(body).Title + "\n" +
        "Release Year: " + JSON.parse(body).Year + "\n" +
        "IMDB Rating: " + JSON.parse(body).imdbRating + "\n" +
        "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\n" +
        "Country: " + JSON.parse(body).Country + "\n" +
        "Language: " + JSON.parse(body).Language + "\n" +
        "Plot: " + JSON.parse(body).Plot + "\n" +
        "Actors: " + JSON.parse(body).Actors + "\n" +
        "-------------------------------------------------------");

    }

  });

};

function read() {

  fs.readFile("random.txt", "UTF8", function (err, data) {

    if (!err) {

      var inputArray = data.split(",")
      // console.log(inputArray)
      process.argv[3] = inputArray[1].replace(/"/g, '').trim();
      // console.log(process.argv[3])
      if (inputArray[0] === "my-tweets") {

        getTweets();

      }
      else if (inputArray[0] === "spotify-this-song") {

        songSearch();

      }
      else if (inputArray[0] === "movie-this") {

        movieSearch()

      }

    }
    else {

      console.log(err);

    }

  });

}

function input() {

  var userInput = "";

  for (var i = 3; i < process.argv.length; i++) {

    userInput = userInput.trim() + " " + process.argv[i];

  }
  return userInput.trim();
  console.log(userInput);

}

function write(output) {

  fs.appendFile("log.txt", output, function (err) {

    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");

  });

}