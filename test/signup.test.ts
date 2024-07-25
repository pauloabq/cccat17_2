import { signup } from "../src/signup";

test("Deve criar uma conta para o passageiro", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045",
    isPassenger: true
  }
  const output = await signup(input);
  expect(output.accountId).toBeDefined();
});