import { phone } from "../normalization/phone";

test("Phone should be able to be called", () => {
  expect(phone("20733109", "")).toBeTruthy();
});

test("Phone should remove non-numeric values", () => {
  expect(phone("a29c0", "")).toStrictEqual("290");
});

test("Phone should format 3 digit (DDD) DDD-DDDD accurately", () => {
  expect(phone("867", "(DDD) DDD-DDDD")).toStrictEqual("867");
});

test("Phone should format 5 digit (DDD) DDD-DDDD accurately", () => {
  expect(phone("86753", "(DDD) DDD-DDDD")).toStrictEqual("(867) 53");
});

test("Phone should format 7 digit (DDD) DDD-DDDD accurately", () => {
  expect(phone("8675309", "(DDD) DDD-DDDD")).toStrictEqual("(867) 5309");
});

test("Phone should format 10 digit (DDD) DDD-DDDD accurately", () => {
  expect(phone("1238675309", "(DDD) DDD-DDDD")).toStrictEqual("(123) 867-5309");
});

// test("Phone should format 10 digit DDD-DDDD accurately", () => {
//   expect(phone("1238675309", "DDD-DDDD")).toStrictEqual("867-5309")
// })
