/* 
	node .\app.js
	http://localhost:3000/
*/

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');


var app = express();

/*var logger = function(req, res, next){
	console.log("logging...");
	next();
}

app.use(logger);*/

//View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Set static path
app.use(express.static(path.join(__dirname, 'public')));

//Global Vars
app.use(function(req, res, next){
	res.locals.errors = null;
	next();
})

//Express Validator Middleware
app.use(expressValidator({
	errorFormatter: function(param, msg, value){
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length){
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param : formParam,
			msg : msg,
			value : value
		};
	}
}));

var users = [
	{
		id: 1,
		first_name: 'John',
		last_name: 'Doe',
		email: 'johndoe@gmail.com'
	},
	{
		id: 2,
		first_name: 'John2',
		last_name: 'Doe2',
		email: 'johndoe@gmail.com'
	},
	{
		id: 3,
		first_name: 'John3',
		last_name: 'Doe3',
		email: 'johndoe@gmail.com'
	},
]

app.get('/', function(req, res){
	var title = 'Customers';
	res.render('index', {
		title: 'CustomerApp',
		users: users
	});
});


app.post('/users/add', function(req, res){

	req.checkBody('first_name', 'First name is required').notEmpty();
	req.checkBody('last_name', 'last name is required').notEmpty();
	req.checkBody('email', 'email is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		console.log("errors");
		res.render('index', {
			title: 'CustomerApp',
			users: users,
			errors: errors
		});
	} else{
		var newUser = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email
		}
	}
	
	console.log(newUser);
})

app.listen(3000, function(){
	console.log("server started on port 3000...");
})








