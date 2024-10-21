const mongoose = require('mongoose');
const dbUrl = process.env.DATABASE_URL;

if(!dbUrl) {
    console.error('DATABASE_URL is not defined in the environment variables.');
    process.exit(1);
}

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connection successful to MongoDB');
})
.catch((error) => {
    console.error('Connection unsuccessful to MongoDB:', error.message);
});

const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('Mongoose connected to the database');
});

connection.on('error', (error) => {
    console.error('Mongoose connection error:', error);
});

connection.on('disconnected', () => {
    console.log('Mongoose disconnected from the database');
});
