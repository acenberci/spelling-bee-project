const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require('fs');
const englishDictionary = require("./dummyDictionary/dictionary.json");
app.use(cors());
app.use(bodyParser.json());
app.post("/en", (req, res) => {
  var {value} = req.body
  value = value.toLocaleLowerCase("en");
  if(englishDictionary[value])res.json(true)
    else res.json(false)
})

app.post("/tr", (req, res) => {
  var {value} = req.body
  value = value.toLocaleLowerCase("tr");
  fs.readFile('./dummyDictionary/turkishDictionary.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Dosya okunurken bir hata oluştu:', err);
      return;
    }
    if (data.includes(value)) {
      res.json(true)
    } else {
      res.json(false)
    }
  });
})


app.listen(3001, "localhost", () => {
    console.log("Server running on port 3001");
  });