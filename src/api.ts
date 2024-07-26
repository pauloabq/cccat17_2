import crypto from "crypto";
import pgp from "pg-promise";
import { validateCpf } from "./validateCpf";
import express from 'express';

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {
  const input = req.body;
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	try {
		const accountId = crypto.randomUUID();
		const [existingAccount] = await connection.query("select * from cccat17.account where email = $1", [input.email]);
		if (existingAccount) throw new Error("Account already exists");
    if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Invalid name");
    if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
    if (!validateCpf(input.cpf)) return res.status(422).json({message: "Invalid CPF"});
    if (input.isDriver && !input.carPlate.match(/[A-Z]{3}[0-9]{4}/)) throw new Error("Invalid plate");
    await connection.query("insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", [accountId, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver]);
    res.json({
      accountId
    });
	} finally {
		await connection.$pool.end(); 
	}
});

app.get("/accounts/:accountId", async function(req, res) {
  const accountId = req.params.accountId;
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  const [account] = await connection.query("select * from cccat17.account where account_id = $1", [accountId]);
  await connection.$pool.end();
  res.json(account);
});

app.listen(3000);