const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const costumers = [];

app.listen(3333);

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;
  const id = uuidv4();

  const costumerAlreadyExist = costumers.some(
    (costumer) => costumer.cpf === cpf
  );

  if (costumerAlreadyExist) {
    return response.status(400).json({ error: "Usuário já existente" });
  }

  costumers.push({
    cpf,
    name,
    id,
    statement: [],
  });

  return response.status(201).send("Usuário criado com sucesso!");
});
