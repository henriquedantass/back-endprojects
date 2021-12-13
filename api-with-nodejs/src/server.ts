import express from "express";

const app = express();

app.listen(3333, () => console.log("Server is running"));

app.get("/", (request, response) => response.json({ message: "hello world" }));
