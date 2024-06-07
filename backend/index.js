import express from 'express';
import { PORT, URL } from './config.js';
import mongoose from 'mongoose';
import { router as booksRoute } from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for handling CORS policy
app.use(cors());

// Middleware for parsing JSON request bodies
app.use(express.json());

// Use the books router for routes starting with /books
app.use('/books', booksRoute);

// Root route
app.get('/', (req, res) => {
    console.log(req);
    res.status(200).send('Hi');
});

// Connect to MongoDB and start the server
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('Error connecting to the database:', error);
    });
