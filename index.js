const express = require ("express")
const uuid = require ("uuid")

const app = express()
const port = 3000
app.use(express.json())

const burgers = []

app.get("/burgers", (request, response) => {
    return response.json(burgers)
})

app.get("/burgers/:id", (request, response) => {
    const { id } = request.params;

    const burger = burgers.find(burger => burger.id === id);

    if (!burger) {
        return response.status(404).json({ mensagem: "Burger não encontrado na lista de ID" });
    }

    return response.json(burger);
});

app.post("/burgers", (request, response) => {
    const {nome, preco, quantidadeEstoque, quantidadeVendida, precoCusto} = request.body
    const burger = {id: uuid.v4(), nome, preco, quantidadeEstoque, quantidadeVendida, precoCusto }

    burgers.push(burger)
    return response.status(201).json(burger)
})

app.put("/burgers/:id", (request, response) => {
    const {id} = request.params
    const {nome, preco, quantidadeEstoque, quantidadeVendida, precoCusto} = request.body

    const atualizarPreco = {id, nome, preco, quantidadeEstoque, quantidadeVendida, precoCusto}

    const index = burgers.findIndex( burger => burger.id === id)

    if(index < 0){
        return response.status(404).json({mensagem: "Burger não encontrado na lista de ID"})
    }

    burgers[index] = { ...burgers[index], ...atualizarPreco }

    return response.json(atualizarPreco)
})

app.delete("/burgers/:id", (request, response) => {
    const {id} = request.params
    const index = burgers.findIndex(burger => burger.id === id)

    if(index < 0){
        return response.status(404).json({mensagem: "Burger não encontrado na lista de ID"})
    }

    burgers.splice(index, 1)

    return response.status(204).json()
})

app.listen(port, () =>{
    console.log(`Servidor iniciado na porta ${port}`)
})