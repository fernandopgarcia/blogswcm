
/**
 * Module dependencies.
 */


var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , partials = require('express-partials');

var app = express();

app.use(partials());

var count=0;

app.use(function(req,res,next){
	
	count++;
	console.log("visitas: " + count);
	next();
});

//var count = require('./count')

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);  //calculo de rutas
app.use(express.static(path.join(__dirname, 'public')));





//app.use(count.count_mw());




// development only
//if ('development' == app.get('env')) {
  //app.use(express.errorHandler());
//}

app.configure('development', function(){
 app.use(express.errorHandler());
});

app.get('/video', routes.video);
app.get('/', routes.index);
app.get('/hello', function(req,res){res.send('Hello Word');});
app.get('/visitas', function(req,res){res.send('Numero de Visitas:  ' + count);});
app.get('/users', user.list);
//app.get('/video', routes.video);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
