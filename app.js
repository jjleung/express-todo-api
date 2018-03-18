const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8080;

const buzzWords = [];
let score = 0;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static("/public"));

app.get("/buzzwords", (req, res) => {
  res.json({ buzzWords: buzzWords });
});

app.post("/buzzword", (req, res) => {
  if (buzzWords.length < 5) {
    buzzWords.push(req.body);
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.put("/buzzword", (req, res) => {
  let isWord = false;
  buzzWords.forEach((bw, i) => {
    if (req.body.buzzWord === bw.buzzWord) {
      score += buzzWords[i].points;
      isWord = true;
      buzzWords[i].heard = true;
      res.json({ success: true, newScore: score });
    }
  });
  if (isWord === false) {
    res.json({ success: false });
  }
});

app.delete("/buzzword", (req, res) => {
  let isWord = false;
  buzzWords.forEach((bw, i) => {
    if (req.body.buzzWord === bw.buzzWord) {
      buzzWords.splice(i, 1);
      isWord = true;
      res.json({ success: true });
    }
  });
  if (isWord === false) {
    res.json({ success: false });
  }
});

app.post("/reset", (req, res) => {
  buzzWords.splice(0, buzzWords.length);
  score = 0;
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

//JSON.stringify
