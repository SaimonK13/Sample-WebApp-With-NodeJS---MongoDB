const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.set('view engine', 'ejs'); //set view engine to ejs
app.use(express.static('public')); //serves all static files in public directory

app.use(bodyParser.urlencoded({ extended: true })); //parses the text as url encoded data
mongoose.connect("mongodb://localhost:27017/Blogpost2"); //connect to Blogpost2 database


//create data schema
const commentSchema = {
    name: String,
    comment: String
}

//create data model
const comments = mongoose.model("comments", commentSchema);

//post comments to database
app.post("/", function (req, res) {

    let newComment = new comments({
        name: req.body.clientName,
        comment: req.body.clientComment
    })

    newComment.save();
    res.redirect('/');
})

//fetch comment and render to the webpage
app.get('/', (req, res) => {

    comments.find({}, function(err, userComment) {
        res.render('index', {
            commentList: userComment
        })

    })
})

//listen on port
app.listen(3000, function() {
    console.log("server is running on 3000");
})