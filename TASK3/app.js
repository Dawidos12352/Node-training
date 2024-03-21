const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const {contactsRouter} = require("./contacts/contacts.router");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  return res.status(404).send({ message: 'Use api on routes: /api/users' });
});

app.use((err, req, res, next) => {
  return res.status(500).send({ message: err.message });
});

module.exports = {app};