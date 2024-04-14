import  Database  from 'better-sqlite3'; 



const db = new Database('guestbook.db'); 

db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY,
        text TEXT
    )
`);




const insertMessage = db.prepare(`INSERT INTO messages (text) VALUES (?)`);

insertMessage.run(" Sometimes I blame my farts on the dog")
insertMessage.run(" I eat my kids Easter eggs and blame it on the elf on the shelf ")

