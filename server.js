var http = require('http');
var library = require('./library');
var url = require('url');
var express = require('express');
var app = express();


// Routers
app.get('/getAllBestSellersBooks', function(req,res){
	var books = library.getAllBestSellersBooks();
	if (books!= null){
		res.json(books);
	}else{
		res.status(200).send({'error':'no result'});
	}
});
app.get('/getBooksByMonth', function(req,res){
	// Get month param
	var urlPart= url.parse(req.url, true);
	var query = urlPart.query;

	var books = library.getBooksByMonth(query.month.toLowerCase());
	if (books!= null){
		res.json(books);
	}else{
		res.status(200).send({'error':'no result'});
	}
});
app.param('id', function(req,res,next,value){
	console.log('Requsl received with id: '+value);
	next();
});
app.get('/getBookById/:id', function(req,res){
	//get id parameter
	var id = req.params.id;

	var book = library.getBookById(id);
	if (book!= null){
		res.json(book);
	}else{
		res.status(200).send({'error':'no result'});
	}
});
app.get('/getBookByName', function(req,res){
	//get name parameter
	var urlPart= url.parse(req.url, true);
	var query = urlPart.query;

	var book = library.getBookByName(query.name.toLowerCase());
	if (book!= null){
		res.json(book);
	}else{
		res.status(200).send({'error':'no result'});
	}
});
app.get('/', function(req,res){
	//return api
	res.send('server root');
});
app.all('*', function(req,res){
	res.send('Wellcom to my project.');
});


app.listen(precess.env.PORT || 3000);
console.log('server running...');