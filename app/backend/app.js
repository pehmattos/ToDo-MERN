const express = require('express');
const todoRoutes = require("./routes/routes");
var bodyParser = require('body-parser');
var cors = require("cors");
//afim de usar o middleware
const app = express();
const PORT = process.env.MONGOPORT || 3000;

app.use(bodyParser.json());
app.use(cors());
// analisa textos json
app.use("/to-do", todoRoutes);
// middleware que redireciona para todoRoutes

app.use((req, res, next) => {
    res.status(404).send("Esta rota não existe!");
});
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta 3000: http://localhost:3000`);
    console.log('CORS-enabled web server listening on port 3000');
});