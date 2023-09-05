const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'senha12345',
    database: 'apilibrarie',
})

module.exports = connection