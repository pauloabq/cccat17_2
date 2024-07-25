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

test("Não deve criar uma conta para o passageiro com nome inválido", async function () {
  const inputNameError = {
    name: "",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045",
    isPassenger: true
  }
  const outputSignUpNameError = await signup(inputNameError);
  expect(outputSignUpNameError).toBe(-3);
});