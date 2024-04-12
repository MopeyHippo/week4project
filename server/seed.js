const mongoose = require('mongoose');
const Message = require('./models/message');


mongoose.connect('mongodb://localhost:27017/guestbook', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', async () => {
    console.log('Connected to MongoDB');


    const messages = [
        { text: "Hello there!" },
        { text: "This is a test message." }
    ];

    try {
        await Message.insertMany(messages);
        console.log('Seed data inserted successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
});