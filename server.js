import express from "express";
import { shortURL } from "./models/shortURL.js";

const app = express();
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

var shortened = "";
app.get("/", (req, res) => {

  res.render("index", {shortened:shortened});
});

app.post("/shortenURL", async (req, res) => {
  let found = await shortURL.findOne({ full: req.body.URL_Input });
  if (!found) found = await shortURL.create({ full: req.body.URL_Input });
  shortened = found.short;

  res.redirect("/");
});

app.get("/:url", async (req, res)=>{
    const y = await shortURL.findOne({short:req.params.url})
    if(y===null) res.sendStatus(404)
    else res.redirect(y.full)

})

app.listen(5000, () => {
  console.log("server running");
});
