"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phone_1 = require("../normalization/phone");
test("Phone should be able to be called", () => {
    expect(phone_1.phone("20733109", "")).toBeTruthy();
});
test("Phone should remove non-numeric values", () => {
    expect(phone_1.phone("a29c0", "AAA")).toStrictEqual("290");
});
test("Phone should format 3 digit (AAA) DDD-DDDD accurately", () => {
    expect(phone_1.phone("867", "(AAA) DDD-DDDD")).toStrictEqual("(867");
});
test("Phone should format 5 digit (AAA) DDD-DDDD accurately", () => {
    expect(phone_1.phone("86753", "(AAA) DDD-DDDD")).toStrictEqual("(867) 53");
});
test("Phone should format 7 digit (AAA) DDD-DDDD accurately", () => {
    expect(phone_1.phone("8675309", "(AAA) DDD-DDDD")).toStrictEqual("(867) 530-9");
});
test("Phone should format 10 digit (AAA) DDD-DDDD accurately", () => {
    expect(phone_1.phone("1238675309", "(AAA) DDD-DDDD")).toStrictEqual("(123) 867-5309");
});
// test("Phone should format 10 digit DDD-DDDD accurately", () => {
//   expect(phone("1238675309", "DDD-DDDD")).toStrictEqual("867-5309")
// })
//# sourceMappingURL=phone.test.js.map