import { phone } from "../normalization/phone";

test("Phone should be able to be called", () => {
  expect(phone("20733109", "")).toBeTruthy();
});

test("Phone should remove non-numeric values", () => {
  expect(phone("a29c0", "AAA")).toStrictEqual("290");
});

test("Phone should format 3 digit (AAA) DDD-DDDD accurately", () => {
  expect(phone("867", "(AAA) DDD-DDDD")).toStrictEqual("(867");
});

test("Phone should format 5 digit (AAA) DDD-DDDD accurately", () => {
  expect(phone("86753", "(AAA) DDD-DDDD")).toStrictEqual("(867) 53");
});

test("Phone should format 7 digit (AAA) DDD-DDDD accurately", () => {
  expect(phone("8675309", "(AAA) DDD-DDDD")).toStrictEqual("(867) 530-9");
});

test("Phone should format 10 digit (AAA) DDD-DDDD accurately", () => {
  expect(phone("1238675309", "(AAA) DDD-DDDD")).toStrictEqual("(123) 867-5309");
});

test("Phone should format 10 digit DDD-DDDD accurately", () => {
  expect(phone("1238675309", "DDD-DDDD")).toStrictEqual("867-5309")
})

test("Phone should format 11 digit +N (AAA) DDD-DDDD accurately", () => {
  expect(phone("11238675309", "+N (AAA) DDD-DDDD")).toStrictEqual("+1 (123) 867-5309");
})

test("Strange setups should format correctly\n +N A A A D D D D D D D\n ", () => {
  expect(phone("11234567890", "+N A A A D D D D D D D")).toStrictEqual("+1 1 2 3 4 5 6 7 8 9 0");
})

