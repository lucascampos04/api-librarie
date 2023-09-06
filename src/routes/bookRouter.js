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

router.put('/update/:id', (req, res) => {
    const { title, author, isbn } = req.body
    const bookID = req.params.id

    connection.query(
        'UPDATE books SET title=?, author=?, isbn=? WHERE id=?',
        [title, author, isbn, bookID],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Erro ao atualizar livro' });
            } else {
                res.status(200).json({ message: 'Livro atualizado com sucesso' });
                console.log("livro atualizado com sucesso")
            }
        }
    )
})

router.delete('/delete/:id', (req, res) => {
    const bookID = req.params.id

    connection.query(
        'DELETE FROM books WHERE id=?',
        [bookID],
        (error, results) => {
            if (error) {
                console.error(error)
                res.send(500).json({ error: 'Error ao remover livro' })
            } else {
                res.status(200).json({ message: 'Livro removido com sucesso' })
                console.log("livro removido com sucesso")
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