
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , songs = require('./routes/songs')
  , votes = require('./routes/votes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/songs', songs.list);
app.get('/songs/:id', songs.details);
app.get('/songs/add/:name', songs.add);
app.get('/votes', votes.list);
app.get('/votes/positive/:id', votes.vote);
app.get('/votes/negative/:id', votes.vote);
app.get('/votes/reset', votes.reset);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
