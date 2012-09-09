var votes = {
	'1': {
		'positive': 3,
		'negative': 1
	},
	'2': {
		'positive': 5,
		'negative': 11
	},
	'3': {
		'positive': 1,
		'negative': 8
	},
	'4': {
		'positive': 0,
		'negative': 0
	},
	'5': {
		'positive': 0,
		'negative': 0
	},
	'6': {
		'positive': 0,
		'negative': 0
	},
	'7': {
		'positive': 0,
		'negative': 0
	}
}

//list vots
exports.list = function(request, response) {
  response.send(getVotes());
};

//expose vote list internally
exports.listi = function() {
	return getVotes();
}

//get the actual votes
var getVotes = function() {
	return votes;
}

//vote positive/negative
exports.vote = function(request, response) {
  var id = request.params.id;
  if(votes[id] !== undefined) {
  	if(request.route.path.indexOf("positive") != -1){
	  	votes[id].positive++;
	  }
	  else if(request.route.path.indexOf("negative") != -1){
	  	votes[id].negative++;
	  }
	  response.send(votes[id]);	
  	}
  	else {
  		response.send({'error': "id " + id + " illegal"});
  	}
};

exports.reset = function(request, response) {
  
};