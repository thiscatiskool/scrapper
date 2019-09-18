//npm packages
var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//hosting express
var PORT = process.env.PORT || 3000;
var app = express();
var router = express.Router();

//require the routers to route route route
require("./config/routes")(router);

//static directory
app.use(express.static(__dirname + "/public"));

//handlebars
app.engine("handlebars", expressHandlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//body-parser
app.use(bodyParser.urlencoded({extended: false}));

app.use(router);

//how we incorperate the mongoose db
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true}, function(error){
    if(error){
        console.log(error);
    } else {
        console.log("mongoose connection is successful");
    }
});

app.listen(PORT, function(){
    console.log("Listening on " + PORT);
});

