const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Essa rota envia a página html que contém o formulário
app.get('/index', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Quando uma requisição é enviada, o corpo da requisição vem em formato de texto
// e vem em um formato chamado de urlencoded, para poder extrair esses dados
// primeiro eles devem ser convertidos de texto para um objeto JS.

// Essa linha abaixo faz exatamente isso, as requisições que tem "um corpo" nesse formato 'urlencoded',
// tem o seu "corpo convertido para objeto" e ficam disponíveis na variavel req.body

app.use(express.urlencoded({ extended: true}))

// O formulário tem o action que aponta para essa rota. E aqui eu pego os valores que foram enviados
// e envio de volta para o navegador um código html que tem esses valores imbutidos.

app.post('/processar-formulario', (req, res) => {
    return res.send(
        `<div>
            Olá <strong>${ req.body.nome }</strong>, tudo bem?
        </div>
        <div>
            Você nasceu ${ (2021 - req.body.idade) > 2000 ? 'antes' : 'depois'} do ano 2000
        </div>
        <div>
            Iremos te contatar através do seu email ${ req.body.email }
        </div>
        `
    );;
});

app.listen(port, () => {
    console.log('Server is running');
});