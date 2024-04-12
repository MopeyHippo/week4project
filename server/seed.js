import { Database } from 'better-sqlite3'; // Import Database class from better-sqlite3
import Message from './models/message.js';


const db = new Database('guestbook.db'); // Initialize SQLite database

db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY,
        text TEXT
    )
`);


const messages = [
    { text: "Hello there!" },
    { text: "This is a test message." }
];

const insertMessage = db.prepare(`INSERT INTO messages (text) VALUES (?)`);

try {
    messages.forEach(({ text }) => {
        insertMessage.run(text);
    });
    console.log('Seed data inserted successfully');
} catch (error) {
    console.error('Error seeding data:', error);
}