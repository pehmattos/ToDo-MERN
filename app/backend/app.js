const express = require('express');
const todoRoutes = require("./router/routes");
var bodyParser = require('body-parser');
var cors = require("cors"); //afim de usar o middleware
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || process.env.PORT_LOCAL;

// Middlewares

// modules
app.use(bodyParser.json()); // analisa textos json
app.use(cors()); // corre em diferentes portas

// router-level middleware
app.use("/to-do", todoRoutes, (req, res) =>{
    res.send('empty')
});

// built-in middleware
app.use(express.json());

// error handling middleware
app.use((req, res, next) => {
    res.status(404).send("Esta rota não existe!");
});


app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
    console.log('CORS-enabled');
});