import express from 'express';
export const router = express.Router();
import {Book} from '../models/bookModel.js';

//Route for save a new Book
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishedYear) {
            return res.status(400).send({
                message: 'Send all required fields : title, author, publishedYear'
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }

});

//Route to get all books from database
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count:books.length,
            data:books
        });
} catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

//Route to get one book by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

//Route to update a book
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title ||
            !req.body.author ||
            !req.body.publishedYear) {
            return res.status(500).send({
                message: 'Send all required fields'
            });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).send({
            message: "book updated successfully"
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

//Route to delete a book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "book not found" });
        }

        return res.status(200).send({ message: "Book deleted successfully" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

