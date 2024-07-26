import axios from "axios";

axios.defaults.validateStatus = function(){
  return true;
}

test("Deve criar uma conta para o passageiro", async function () {
  const inputSignup = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045",
    isPassenger: true
  }
  const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup);
  const outputSignUp = responseSignup.data;
  expect(outputSignUp.accountId).toBeDefined();
  const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignUp.accountId}`);
  const outputGetAccount = responseGetAccount.data;
  expect(outputGetAccount.name).toBe(inputSignup.name);
  expect(outputGetAccount.email).toBe(inputSignup.email);
  expect(outputGetAccount.cpf).toBe(inputSignup.cpf);
});

test("Deve criar uma conta para o passageiro", async function () {
  const inputSignup = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    cpf: "28722437045123",
    isPassenger: true
  }
  const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup);
  const outputSignUp = responseSignup.data;
  expect(responseSignup.status).toBe(422);
  expect(outputSignUp.message).toBe("Invalid CPF");
});