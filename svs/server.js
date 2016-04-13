var express = require('express')
var app = express();
var restapi = express();

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

// app.get('/users', user.findAll);
// app.get('/users/:id', user.findById);
// app.post('/users', user.addUser);


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('users/user.db');

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS usertb (name TEXT, year INTEGER, major TEXT)");
    db.run("INSERT INTO usertb (name, year, major) VALUES (?, ?, ?)", "kaelan cooter",2016, "computer science");
    db.run("INSERT INTO usertb (name, year, major) VALUES (?, ?, ?)", "ninad limaye", 2016, "information assurance");
});

restapi.get('/users', function(req, res, next) {
   db.all("SELECT * FROM usertb", function(err, row){
	if (err!== null) {
	   next(err);
	}
	else {
	console.log(row);
        res.json({ "name": row.name, "year": row.year, "major": row.major });
	res.send(200, html);
	}
 });
});

restapi.post('/users',function(req, res, next) {
  name = req.body.name;
  year = req.body.year;
  major = req.body.major;
  sqlRequest = "INSERT INTO 'usertb' (name, year, major) " +
               "VALUES('" + name + "', '" + year + "', '" + major + "')"
  db.run(sqlRequest, function(err) {
    if(err !== null) {
      next(err);
    }
    else {
      res.redirect('back');
    }
  });
});


app.listen(3000);
console.log('Listening on port 3000...');

// app.get('/', function(req, res) {
//   res.sendfile('./public/index.html')
// });
