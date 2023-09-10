const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'formulario_db',
    password: 'zx50159230*',
    port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('formulario');
});

app.post('/submit_form', (req, res) => {
    const { nombre, email, comentario } = req.body;
    const query = 'INSERT INTO respuestas (nombre, email, comentario) VALUES ($1, $2, $3)';
    const values = [nombre, email, comentario];

    pool.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            res.send('Error al enviar el formulario');
        } else {
            res.redirect('/');
        }
    });
});

app.listen(port, () => {
    console.log(`Aplicación web de formulario escuchando en http://localhost:${port}`);
});
