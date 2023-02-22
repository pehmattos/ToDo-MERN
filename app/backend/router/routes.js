// ele modula as rotas, deixando-as em um arquivo separado
const express = require('express');
// database connection
const db = require("../services/data");
const { ObjectId } = require('mongodb');

var router = express.Router();

// db.connectToDB((err) => {
//     if(err) console.log(err);

    function checkBody(req, res, next) {
        if("_id" in req.body) {
            req.body._id = ObjectId(req.body._id);
        }
        next();
    }// converte string 'id' em ObjectId
    
    router.get("/list", async (req, res, next) => {
        const results = await db.findDocuments();
        res.send(results);
    }); // listar items

    router.post("/add",  async (req, res, next) => {
        const results = await db.insertDocuments(req.body);
        res.send(results);
    });// 'inserir items' - Postman
    
    router.patch("/update", checkBody, async (req, res, next) => {
        const results = await db.updateDocument(req.body);
        res.send(results);
    });// 'atualizar items' - Postman 
    
    router.delete("/delete", checkBody, async (req, res, next) => {
        const results = await db.removeDocument(req.body);
        res.send(results);
    });//'deletar items' - Postman
// });

module.exports = router;