const express = require('express');
const fs = require('fs');
const util = require('util');

const { promisify } = util;

server = express();
server.use(express.json());

const authMedleware = (req, res, next) => {
  if (req.headers.authorization) {
    return next();
  }
  res.status(401).json({message: 'Token is required'})
}

server.use(authMedleware);

server.get('/', (req, res) => {  
  res.status(200).send({message: "ok"})
});

server.post('/createGarage', (req, res) => {  
  const { body } = req;
  console.log(body);
  fs.writeFileSync('./garage.json', JSON.stringify([body]))
  res.status(200).send({message: "ok criado"})
});

server.get('/recuperarGaragem', (req, res) => {  
  fs.readFile('./garage.json', 'utf-8', promisify((err, content) => {
    if (err) {
      res.status(400).send({message: 'Not Found'});
      return;
    }
    res.status(200).send(content)
  }));
});

server.post('/inserirNovoCarro', (req, res) => {  
  fs.readFile('./garage.json', 'utf-8', promisify((err, content) => {
    const { body } = req;
    const todosOsCarros = JSON.parse(content);
    const novaListaDeCarros = [...todosOsCarros, body];
    fs.writeFileSync('./garage.json', JSON.stringify(novaListaDeCarros));
    res.status(200).send({message: "Carro Inserido"});
  }))
});

server.put('/removerCarro', (req, res) => {  
  fs.readFile('./garage.json', 'utf-8', promisify((err, content) => {
    const { id } = req.query;
    const todosOsCarros = JSON.parse(content);
    const novaListaDeCarros = todosOsCarros.filter((car) => car.id !== +2);

    fs.writeFileSync('./garage.json', JSON.stringify(novaListaDeCarros));
    res.status(200).send({message: "Carro Removido"});
  }))
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});