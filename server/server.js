import express, { response } from "express";
import Database  from 'better-sqlite3'; // Import Database class from better-sqlite3
import cors from "cors"

const app = express();
app.use(express());
app.use(cors());
const PORT = 8080;

const db = new Database('guestbook.db'); // Initialize SQLite database

app.use(express.json());


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
    const query = db.prepare(`SELECT * FROM messages`);
    const messages = query.all();
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
