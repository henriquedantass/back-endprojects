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

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
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

app.get("/statement/date", verifyIfAccountExists, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  );

  return response.json(statement);
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

app.post("/withdraw", verifyIfAccountExists, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({ error: "Saldo insuficiente!" });
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  };

  customer.statement.push(statementOperation);

  return response.status(201).send("Saque realizado com sucesso!");
});
