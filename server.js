const express = require("express")
const cors = require("cors")
const dados = require("./dados")

const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}

function autoIncrement(){
    return Number(dados[dados.length - 1].id) + 1
}

const mostrarDados = (req, res) => {
    res.send(dados)
}

const novoDado = (req, res) => {
    if (req.body) {
        const novo = req.body
        novo.id = autoIncrement()
        dados.push(novo)
        res.send("Dado cadastrado com sucesso")
    } else {
        res.send("Erro ao cadastrar")
    }
}

const buscarDadoPorId = (req, res) => {
    const id = req.params.id
    const dadoLocalizado = dados.filter((dado) => dado.id == id)

    if (dadoLocalizado.length > 0) {
        res.send(dadoLocalizado)
    } else {
        res.status(404).send("Dado não foi nencontrado")
    }
}

const buscarDadoPorRisco = (req, res) => {
    const risco = req.params.nivelrisco
    const dadoLocalizado = dados.filter((dado) => dado.nivelrisco == risco)

    if (dadoLocalizado.length > 0) {
        res.send(dadoLocalizado)
    } else {
        res.status(404).send("Dado não localizado")
    }
}


const buscarDadoPorTipo = (req, res) => {
    const tipo = req.params.tipo
    const dadoLocalizado = dados.filter((dado) => dado.tipo == tipo)

    if (dadoLocalizado.length > 0) {
        res.send(dadoLocalizado)
    } else {
        res.status(404).send("Dado não localizado")
    }
}

const excluirDado = (req, res) => {
    const id = req.params.id
    const indice = dados.findIndex((dado) => dado.id == id)

    if (indice !== -1) {
        dados.splice(indice, 1)
        res.send("Dado excluído")
    } else {
        res.status(404).send("Dado não encontrado")
    }
}

const alterarDado = (req, res) => {
    const id = req.params.id
    const novo = req.body
    const dado = dados.find((dado) => dado.id == id)

    if (dado) {
        dado.sistema = novo.sistema
        dado.tipo = novo.tipo
        dado.finalidade = novo.finalidade
        dado.tecnologia = novo.tecnologia
        dado.nivelrisco = novo.nivelrisco
        dado.possui_revisao_humana = novo.possui_revisao_humana
        res.send("Dados atualizados")
    } else {
        res.status(404).send("Dado não encontrado")
    }
}


const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 3000

app.get('/', rotaInicial)
app.post('/dados', novoDado)
app.get('/dados', mostrarDados)
app.get('/dados/risco/:nivelrisco', buscarDadoPorRisco)
app.get('/dados/tipo/:tipo', buscarDadoPorTipo)
app.get('/dados/:id', buscarDadoPorId)
app.put('/dados/:id', alterarDado)
app.delete('/dados/:id', excluirDado)

app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`)
})
