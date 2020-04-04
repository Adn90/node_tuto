const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
const cors = require("cors");


//iniciando app
//express é um microframework para trabalhar com rotas e views
const app = express();
app.use(express.json()); // permite envio de dados no formato json

//permitir que outros endereços acessem a API. Os parâmetro é possível configurar quem pode acessar
// Basicamente nessa config, ela é de acesso público
app.use(cors());
//iniciando BD
mongoose.connect(
  "mongodb+srv://adn:rlx741@cluster0-clyad.mongodb.net/nodeTest?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

// Registrar model no BD, requireDir faz o registro para todos os models
requireDir("./src/models"); 

// 1ª rota. Use é um wildcard/coringa, que aceita qualquer requisição 
app.use('/api',require("./src/routes"));

app.listen(3001);
