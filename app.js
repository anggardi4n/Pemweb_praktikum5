const express = require('express')
const mysql = require('mysql2')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pertemuan5'
});

connection.connect((err) => {
    if(err){
        console.error("Terjadi kesalahan dalam koneksi ke Mysql:", err.stack);
        return;
    }
    console.log("Koneksi Mysql berhasil dengan id" + connection.threadId)
});
app.set('view engine', 'ejs');

// ini adalah routing (Create, Read, Update, Delete)

//Read
app.get('/',(req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
        res.render ('index',{users: results});
    });
});


app.listen(3000,() =>{
    console.log("Server berjalan di port 3000, buka web melalui http://localhost:3000")
});