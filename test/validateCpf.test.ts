import { validateCpf } from "../src/validateCpf"

test.each([
  "28722437045",
  "66476888030",
  "63246019002"
])("Deve testar se o CPF é válido %s", function(cpf: string){
  // when 
  const isValid = validateCpf(cpf);
  // then
  expect(isValid).toBe(true);
});

test.each([
  "",
  null,
  undefined,
  "123456",
  "12345678901234",
  "11111111111"
])("Deve testar se o CPF é inválido %s", function(cpf: any){
  // when 
  const isValid = validateCpf(cpf);
  // then
  expect(isValid).toBe(false);
});
