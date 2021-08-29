// Assincronissidade

// EACESS = Sem Acesso
// ENOENT = Não existe

const fs = require('fs');
const util = require('util');

const { promisify } = util;

fs.readFile('./file.txt', 'utf-8', promisify((err, content) => {
  if (err) {
    console.log('Não Existe');
    console.log(err.code)
    console.log(err.path)
    return;
  }
  console.log(content);
}));