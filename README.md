# liri-node-app

Liri command line app

# Purpose

Welcome to Liri

  Liri is a web based entertainment/social media search applicaiton

  The creation of this application was to challenge the creator and test their node.js skills

  Currently you are able to search for the following information
    Movies
    Songs
    Tweets
  By following the steps below you will be able to search for information from these three categories.

# Packages

    Twitter
    Spotify
    Request
    DotEnv

# Instructions

  Navigate to the root of the cloned respository in the terminal and run the following npm commands to install the proper packages.

    npm init
    npm install
    
  Create DotEnv file

    Create a new file named .env, this file will be used to hold your Spotify and Twitter Api Keys so you do not expose your private infomraiton

    In the file place the following text:

    ----------------------------------------
    # Spotify API keys

    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret

    # Twitter API keys

    TWITTER_CONSUMER_KEY=your-twitter-consumer-key
    TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
    TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
    TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

    -----------------------------------------

    Navitgate here to create your API keys for Spotify if you have not done so
    (Any information asked to create profile is not sensitive and dummy information can be used)

      https://developer.spotify.com/my-applications/#!/

    Replace

      your-spotify-id
      your-spotify-secret

    in the .env file with your corresponding Spotify API information.

    Navitgate here to create your API keys for Twitter if you have not done so
    (Any information asked to create profile is not sensitive and dummy information can be used)

      https://apps.twitter.com/app/new

    Replace

      your-twitter-consumer-key
      your-twitter-consumer-secret
      your-access-token-key
      your-twitter-access-token-secret

    in the .env file with your corresponding Spotify API information.

  Open liri.js in the terminal

    Right click file and select open in terminal

  Paste/Type the following information into the command line:

    Command Line Search Syntax: 'node liri.js <category(Required)> <user input(optional)>.

  Replace <category> with one the follow options:

    Movies = 'movie-this'
    Songs = 'spotify-this-song'
    Tweets = 'my-tweets'
    ReadFile = 'do-what-it-says'

  Replace <user input> with the name of a song or title of a movie when searching in the Movie/Song category else remove it from the search

# 
