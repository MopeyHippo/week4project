import  Database  from 'better-sqlite3'; 



const db = new Database('guestbook.db'); 

db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY,
        text TEXT
    )
`);




const insertMessage = db.prepare(`INSERT INTO messages (text) VALUES (?)`);

insertMessage.run(" This is my first test message")
insertMessage.run(" message attempt #2")

