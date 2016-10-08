const fs = require("fs");
const request = require("request");
const spot = require("spotify");
const Twitter = require("twitter");
const keys = require("./keys.js");
const client = new Twitter(keys.twitterKeys);


var input = process.argv[2];
var run = function(input) {
	switch (input) {
		case "my-tweets":
			twitter();
			break;

		case "spotify-this-song":
			spotify();
			break;

		case "movie-this":
			omdb();
			break;

		case "do-what-it-says":
			fs.readFile("./random.txt", function read(error, response){
				console.log(response);
			})
			break;
	}
}

function twitter() {
	console.log("Twitter function is running")
	var params = { screen_name: 'Sharkman_Jhones' };
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (x = 0; x < 20; x++) {
				console.log("___________________________\n");
				console.log("Date/Time: " + tweets[x].created_at);
				console.log("Tweet: " + tweets[x].text);
			}
		}
	});

}

function spotify() {
	var userSong = process.argv[3];
	if (userSong == undefined) {
		userSong = "The Sign";
	}

	spot.search({ type: "track", query: userSong }, function(error, response) {
		if (error) {
			console.log("Error has occurred " + error);
			return;
		}
		console.log("___________________________\n");
		console.log("Artist: "+response.tracks.items[0].artists[0].name);
		console.log("Track Title: "+response.tracks.items[0].name);
		console.log("Spotify preview URL: "+response.tracks.items[0].preview_url);
		console.log("Album Name: "+response.tracks.items[0].album.name);
		console.log("___________________________");

	});

}

function omdb() {
	var userMovie = process.argv[3];
	if (userMovie == undefined) {
		userMovie = "mr nobody";
	}
	request("http://www.omdbapi.com/?t=" + userMovie + "&tomatoes=true", function(error, response, body) {
		var mov = JSON.parse(body);
		if (!error && response.statusCode == 200) {
			console.log("\n___________________________");
			console.log("Movie Title: " + mov.Title);
			console.log("Year of Relese: " + mov.Year);
			console.log("IMDB Rating: " + mov.imdbRating);
			console.log("Country of Origin: " + mov.Country);
			console.log("Language: " + mov.Language);
			console.log("Plot Summary:\n" + mov.Plot);
			console.log("Cast: " + mov.Actors);
			console.log("Rotton Tomatoes Rating: " + mov.tomatoMeter + "%");
			console.log("Rotton Tomatoes URL: " + mov.tomatoURL);
		}
	})


}

run(input);
