const express = require('express');
const bodyParser = require('body-parser')
const connection = require('../model/bookBd')
const router = express.Router();

router.use(express.urlencoded({ extended: false }))

router.post('/add', (req, res) => {
    const { title, author, isbn } = req.body

    connection.query(
        'INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)',
        [title, author, isbn],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Erro ao adicionar livro' })
            } else {
                res.status(201).json({ id: results.insertId })
            }
        }
    )
})

router.get('/', (req, res) => {
    connection.query('SELECT * FROM books', (error, results) => {
        if (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao buscar livros' })
        } else {
            res.json(results)
        }
    })
})

module.exports = router;