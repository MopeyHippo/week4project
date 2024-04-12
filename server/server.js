import express from "express";
import bodyParser from "body-parser"
import mongoose from 'mongoose';
import Message from './models/message.js';

const app = express();
const port = 8080;

mongoose.connect('mongodb://localhost:27017/guestbook', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.json());

// let messages = [];

app.post('/api/messages', async (req, res) => {
  const { text } = req.body;
  if (!text) {
      return res.status(400).json({ error: 'Message text is required' });
  }

  try {
      const newMessage = new Message({ text });
      await newMessage.save();
      res.status(201).json(newMessage);
  } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
      const messages = await Message.find();
      res.json(messages);
  } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!")
});
app.listen(port, () => 
console.log(`Server running on port ${port}`));
