// importação do express para iniciar o servidor
const express = require("express");

const app = express();

app.use(express.json());

/**
 * METODOS DE REQUESTS
 * GET -- buscar informações dentro do servidor
 * POST -- inserir uma informação dentro do servidor
 * PUT -- alterar uma informação do servidor
 * PATCH -- alterar uma informação especifica no servidor
 * DELETE -- deletar uma informação do servidor
 */

/**
 * TIPOS DE PARAMETROS
 *
 * Route Params => Identificar um recurso editar/deletar/buscar
 * Query Params => Paginação / Filtro
 * Body Params => Os objetos inserção/alteração  (JSON)
 */

app.get("/items", (request, response) => {
  const query = request.query;
  console.log(query);
  return response.json(["item 1", "item 2", "item 3"]);
});

app.post("/items", (request, response) => {
  const body = request.body;
  console.log(body);
  return response.json(["item 1", "item 2", "item 3", "item 4"]);
});

app.put("/items/:id", (request, response) => {
  const params = request.params;
  console.log(params);
  return response.json(["item 6", "item 2", "item 3", "item 4"]);
});

app.patch("items/:id", (request, response) => {
  return response.json(["item 6", "item 2", "item 3", "item 4"]);
});

app.delete("items/:id", (request, response) => {
  return response.json(["item 6", "item 2", "item 4"]);
});

// A aplicação necessita de uma porta para ser ouvida
app.listen(3333);
