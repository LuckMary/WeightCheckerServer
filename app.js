const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// parse application/json
app.use(express.json());

let weights = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hello", (req, res) => {
  res.json({
    hello: "world",
    maria: "puckich!",
  });
});

app.get("/weights", (req, res) => {
  const userId = req.query.userId;
  res.json({
    weights: weights.filter((item) => item.userId === userId),
  });
});

app.post("/weights", (req, res) => {
  const text = req.body.text;
  const userId = req.query.userId;

  const key = Math.random();

  weights = [{ text, key, userId }, ...weights];

  res.json({
    weight: { text, key, userId },
  });
});

app.delete("/weights/:key", (req, res) => {
  const key = +req.params.key;
  const userId = req.query.userId;

  const weight = weights.find(
    (item) => key === item.key && userId === item.userId
  );
  weights = weights.filter((item) => key !== item.key);
  res.json({
    weight,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
