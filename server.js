// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');



let myData = [
name = "Knife Github Repo",
github_profile = "https://github.com/mfullford/knife_api",
intent = "Educate people about the many types of knives",
];



/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

// show home page
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// show profile page
app.get('/api/profile', function homepage(req, res) {
  res.json(myData);
});

// show my knives
app.get('/api/knives', function homepage(req, res) {
	db.Knife.find({}, function(err, knives) {
		if (err){
			return console.log("Error:", err);
 		}
		res.json(knives); 		
	});
});

// show just one knife
app.get('/api/knives/:id', function(req,res) {
	index = req.params.id;
  db.Knife.findOne({_id:index}, function(err, knives) {
	 res.json(knives[index]);
  });
});


//create new knife
app.post('/api/knives', function (req, res) {
   let newKnife = new db.Knife({
    "name": req.body.name,
    "description": req.body.description,
    "rating": req.body.rating,
    "review": req.body.review
  });
  newKnife.save(function (err, knives) {
    if (err) throw err;
    res.json(knives);
  });
});


// Update a knife
app.put('/api/knives/:id', function(req,res) {
  let searchId = req.params.id; 
  db.Knife.findOne({_id: req.params.id}, function(err, knife) {
    if (err) {
      return console.log("Error!" + err);
    } else {
      knife.name = req.body.name;
		  knife.description = req.body.description;
		  knife.rating = req.body.rating;
      knife.review = req.body.review
      knife.save(function(err, updatedKnife) {
        if (err) {
          return console.log(err);
        }
      }); 
      res.json(updatedKnife);
    };
  });
});


// delete sinlge knife - done

app.delete('/api/knives/:id', function(req, res) {
  index = req.params.id;
  db.Knife.findOneAndRemove({_id:index}, function(err, knife) {
    if (err) {
      console.log("ERROR:" + err);
    }
    res.send("Knife deleted");
  });
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    message: "Welcome to the knives api! Here's what you need to know!",
    documentation_url: "https://github.com/mfullford/knife_api/blob/master/README.md",
    base_url: "https://git.heroku.com/evening-eyrie-78865.git", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about the api"}, // changed
      {method: "GET", path: "/api/knives", description: "Index of all knives"},
      {method: "POST", path: "/api/knives", description: "Add a knife"}, // CHANGED
      {method: "GET", path: "/api/knives/:id", description: "View one knife"},
      {method: "PUT", path: "/api/knives/:id", description: "Update an existing knife"},
      {method: "DELETE", path: "/api/knives/:id", description: "Delete a knife"}
    ]
  })
});

app.get('/api/knives', function knife_index(req, res) {
  res.json('seed.js' , { root : __dirname});
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});