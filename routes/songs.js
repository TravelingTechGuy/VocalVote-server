var emusicAPIKey = "uuursxaqn4t73z7xph7a4ctk";
var songs = {
	'1' : "Sexy and I know it",
	'2' : "Whistle",
	'3' : "Give your heart a break",
	'4' : "Wide Awake",
	'5' : "Everybody Talks",
	'6' : "One More Night",
	'7' : "Lights"
};


//get songs list
exports.list = function(request, response) {
  getSongsList(response);
};

//get song details by id
exports.details = function(request, response) {
	var id = request.params.id
	, songName = escape(getSongName(id))
	, http = require('http')
	, options = {
		  host: 'api.emusic.com',
		  port: 80,
		  path: '/track/search?format=json&perPage=1&apiKey=' + emusicAPIKey + '&term=' + songName,
		  method: 'GET'
		};

	response.setHeader("Content-Type", "application/json");

	var req = http.request(options, function(res) {
	  res.on('data', function (data) {
	    response.write(data);
	  });
	});
	req.end();
	req.on('error', function(e) {
	  console.log(options.host + options.path);
	  console.log('problem with request: ' + e.message);
	});
}

//add song
exports.add = function(request, response) {
	var name = request.params.name;
	songs.push({'id': "id" + songs.length, 'name': name});
	response.send(songs[songs.length - 1]);
}

//reset songs list
exports.reset = function(request, response) {

}

//get song details by ID
var getSongsList = function(response) {
	var votes = require('./votes').listi();
	var songsResult = {};
	for(var id in songs) {
		songsResult[id] = {'name': songs[id], 'positive': votes[id].positive, 'negative': votes[id].negative};
	}
	response.send(songsResult);
}

//get song name by id
var getSongName = function(id) {
	return songs[id];
}