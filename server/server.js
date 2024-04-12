import express, { response } from "express";
import Database  from 'better-sqlite3'; // Import Database class from better-sqlite3
import cors from "cors"

const app = express();

app.use(cors());
const PORT = 8080;

const db = new Database('guestbook.db'); // Initialize SQLite database

app.use(express.json());


app.post('/api/messages', (req, res) => {
  const { text } = req.body;
  console.log(text)
  if (!text) {
      return res.status(400).json({ error: 'Message text is required' });
  }

  try {
      const stmt = db.prepare('INSERT INTO messages (text) VALUES (?)');
      stmt.run(text);
      // const newMessage = { id: info.lastInsertRowid, text };
      res.status(201).json("success");
  } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/messages', (req, res) => {
  try {
      const query = db.prepare('SELECT * FROM messages').all();
      res.json(query);
  } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
