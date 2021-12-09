const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

// MIDDLEWARE
function verifyIfAccountExists(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: "Usuário não encontrado!" });
  }

  request.customer = customer;

  return next();
}

app.listen(3333);

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;
  const id = uuidv4();

  const costumerAlreadyExist = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (costumerAlreadyExist) {
    return response.status(400).json({ error: "Usuário já existente" });
  }

  customers.push({
    cpf,
    name,
    id,
    statement: [],
  });

  return response.status(201).send("Usuário criado com sucesso!");
});

app.get("/statement", verifyIfAccountExists, (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
});

app.post("/deposit", verifyIfAccountExists, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});
