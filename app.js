//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();
// app.use("view engine", "ejs");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const items = ["Wake up at 5:30 am", "Freshen Up by 5:50 am", "Leetcode till 7:30 am"];
const workItems = [];


app.get("/", function(req, res){

    const day = date.getDate();

    res.render("list", {listTitle: day, newListItem: items});

});

app.post("/", function(req, res){
    const item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work", newListItem: workItems});
});

app.post("/work", function(req, res){
    const workItem = req.body.newItem;
    workItems.push(workItem);
    res.redirect("/work");
});

app.get("/about", function(req, res){
    res.render("about");
})

app.listen(3000, function(){
    console.log("Application is running on port 3000....");
})