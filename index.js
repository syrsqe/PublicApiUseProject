import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", async (req,res) =>{
   
    const serverReply = await axios.get("https://v2.jokeapi.dev/joke/dark");
    console.log(serverReply.data.setup);
    console.log(serverReply.data.delivery);
    const setup = JSON.stringify(serverReply.data.setup);
    const punchLIne = JSON.stringify(serverReply.data.delivery);

    res.render("index.ejs", {selectedJoke: "Any"});

});

app.post("/submit", async (req,res)=>{
console.log(req.body.selectedJoke);
const selectedCategory = req.body.selectedJoke;
const serverReply = await axios.get("https://v2.jokeapi.dev/joke/" + selectedCategory);
console.log(serverReply.data.setup);
console.log(serverReply.data.delivery);
const setup = JSON.stringify(serverReply.data.setup);
const punchLIne = JSON.stringify(serverReply.data.delivery);

res.render("index.ejs", {setup: setup, punchLine: punchLIne, selectedJoke: selectedCategory});
});

app.listen(port, () =>{
    console.log("The server is running on port: " + port);
})