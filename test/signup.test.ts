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
  expect(outputGetAccount.car_plate).toBe(input.carPlate);
});

test("Não deve criar uma conta para o passageiro com nome inválido", async function () {
  const input = {
    name: "",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045",
    isPassenger: true
  }
  await expect(() => signup(input)).rejects.toThrow("Invalid name");
});

test("Não deve criar uma conta para o passageiro com email inválido", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}`,
    cpf: "28722437045",
    isPassenger: true
  }
  await expect(() => signup(input)).rejects.toThrow("Invalid email");
});

test("Não deve criar uma conta para o passageiro com cpf inválido", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045123",
    isPassenger: true
  }
  await expect(() => signup(input)).rejects.toThrow("Invalid CPF");
});

test("Não deve criar uma conta com e-mail duplicado", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045",
    isPassenger: true
  }
  await signup(input);
  await expect(() => signup(input)).rejects.toThrow("Account already exists");
});

test("Não deve criar uma conta com placa inválida", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045",
    isDriver: true,
    carPlate: "AAA999"
  }
  await expect(() => signup(input)).rejects.toThrow("Invalid plate")
});