const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      methodOverride = require('method-override'),   
      app = express();

// APP SETUP
mongoose.connect('mongodb://127.0.0.1/blogs');  // setup mongoose 
app.set('view engine', 'ejs');                  // setup view engine
app.use(express.static('public'));              // serve from public dir
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));                        // Enable PUT and DELETE Methods

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
app.get('/', function(req, res) {
    res.redirect('/blogs');
});

app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {blogs: blogs});
        }
    })
});

// NEW
app.get('/blogs/new', function(req, res) {
    res.render('new');
});

// CREATE 
app.post('/blogs', function(req, res) {
    // create blog
    Blog.create(req.body.blog, function(err, blog) {
        if (err) {
            console.log(err);
        } else {
            console.log('NEW');
            console.log(blog);
            res.redirect('/blogs');
        }
    });
});

// SHOW
app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            res.render('show', {blog: blog});
        }
    });
});

// EDIT
app.get('/blogs/:id/edit', function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            res.render('edit', {blog: blog});    
        }
    });
});

// UPDATE
app.put('/blogs/:id', function(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog) {
        if (err) {
            console.log(err);
            res.redirect('/blogs');
        } else {
            res.redirect('/blogs/' + req.params.id);
        }
    });
});


app.listen(3000, () => console.log('App listening on port 3000'));
