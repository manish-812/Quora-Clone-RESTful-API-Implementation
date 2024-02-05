const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const{ v4: uuidv4} = require('uuid');
uuidv4();

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use app.use() to set up static file serving middleware
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username : "apnacollege",
        content : "I love coding"
    },
    {
        id: uuidv4(),
        username : "Manish Singh",
        content : "Work is every thing"
    },
    {
        id: uuidv4(),
        username : "Willbot",
        content : "Nothingness is goal"
    },
];

app.get("/posts", (req, res) => { 
    res.render("index.ejs", { posts: posts }); // Pass posts data to the view
});
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) =>{
    let {username , content} = req.body;
    let id = uuidv4();
     posts.push ({id ,username, content});
    res.redirect("/posts");
});
 
app.get("/posts/:id" , (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", {post});
})

app.patch("/posts/:id", (req, res) =>{
    let {id } = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
})

app.get("/posts/:id/edit", (req,res) =>{
    let{id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})

app.delete("/posts/:id", (req,res) =>{
    let{id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.send("deleted ");
})
app.listen(port, () =>{
    console.log("listening to port : 3000");
});
 