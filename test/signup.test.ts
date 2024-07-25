import { getAccount, signup } from "../src/signup";

test("Deve criar uma conta para o passageiro", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045",
    isPassenger: true
  }
  const outputSignUp = await signup(input);
  expect(outputSignUp.accountId).toBeDefined();
  const outputGetAccount = await getAccount(outputSignUp.accountId);
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
});

test("Deve criar uma conta de motorista", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045",
    isDriver: true,
    carPlate: "AAA9999"
  }
  const outputSignUp = await signup(input);
  expect(outputSignUp.accountId).toBeDefined();
  const outputGetAccount = await getAccount(outputSignUp.accountId);
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
});

test("Não deve criar uma conta para o passageiro com nome inválido", async function () {
  const input = {
    name: "",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045",
    isPassenger: true
  }
  const output = await signup(input);
  expect(output).toBe(-3);
});

test("Não deve criar uma conta para o passageiro com email inválido", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}`,
    cpf: "28722437045",
    isPassenger: true
  }
  const output = await signup(input);
  expect(output).toBe(-2);
});

test("Não deve criar uma conta para o passageiro com cpf inválido", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045123",
    isPassenger: true
  }
  const output = await signup(input);
  expect(output).toBe(-1);
});

test("Não deve criar uma conta com e-mail duplicado", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045",
    isPassenger: true
  }
  await signup(input);
  const output = await signup(input);
  expect(output).toBe(-4);
});

test("Não deve criar uma conta com placa inválida", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045",
    isDriver: true,
    carPlate: "AAA999"
  }
  const output = await signup(input);
  expect(output).toBe(-5);
});