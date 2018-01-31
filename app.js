const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),   
      app = express();

// APP SETUP
mongoose.connect('mongodb://127.0.0.1/blogs');  // setup mongoose 
app.set('view engine', 'ejs');                  // setup view engine
app.use(express.static('public'));              // serve from public dir
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

// INDEX



app.listen(3000, () => console.log('App listening on port 3000'));
