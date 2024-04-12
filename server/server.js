import express from "express";
import bodyParser from "body-parser"
const app = express();

const port = 8080;

app.use(bodyParser.json());

let messages = [];

app.post('/api/messages', (req, res) => {
  const { text } = req.body;
  if (text) {
    const newMessage = { id: messages.length + 1, text };
    messages.push(newMessage);
    res.status(201).json(newMessage);
  } else {
    res.status(400).json({ error: 'Message text is required' });
  }
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get("/", (req, res) => {
  res.send("Hello World!")
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
