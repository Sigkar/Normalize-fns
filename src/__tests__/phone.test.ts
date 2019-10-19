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
  expect(phone("1238675309", "DDD-DDDD")).toStrictEqual("867-5309");
});

test("Phone should format 11 digit +N (AAA) DDD-DDDD accurately", () => {
  expect(phone("11238675309", "+N (AAA) DDD-DDDD")).toStrictEqual(
    "+1 (123) 867-5309"
  );
});

test("Strange setups should format correctly +N A A A D D D D D D D", () => {
  expect(phone("11234567890", "+N A A A D D D D D D D")).toStrictEqual(
    "+1 1 2 3 4 5 6 7 8 9 0"
  );
});

test("Optional split text should perform as exptected", () => {
  expect(
    phone("11234567890", "+N A A A D D D D D D D", "SPLIT_DIGITS")
  ).toStrictEqual({
    areaCode: "123",
    digits: "4567890",
    nationalization: "1",
    normalized: "+1 1 2 3 4 5 6 7 8 9 0"
  });
});

// todo: Regex to make sure N is at beginning or end?
test("Split text in the wrong order should not break the function", () => {
  expect(
    phone("12345678901", "DDD AAA DDDD N", "SPLIT_DIGITS")
  ).toStrictEqual({
    areaCode: "456",
    digits: "1237890",
    nationalization: "1",
    normalized: "123 456 7890 1"
  });
  expect(
    phone("31234567", "N D A D A D A D", "SPLIT_DIGITS")
  ).toStrictEqual({
    areaCode: "246",
    digits: "1357",
    nationalization: "3",
    normalized: "3 1 2 3 4 5 6 7"
  });
});

test("Split digits should handle correctly with no area codes or nationalization", ()=>{
  expect(
    phone("1234567", "DDD-DDDD", "SPLIT_DIGITS")
  ).toStrictEqual({
    areaCode: "",
    digits: "1234567",
    nationalization: "",
    normalized: "123-4567"
  })
})

test("Should create formatted strings if you add it to the keys.", () => {
  expect(
    phone("8675309", "N create +-0 A D 000 something D new D today D boiyo D", "SPLIT_DIGITS")
  ).toStrictEqual({
    areaCode: "6",
    digits: "75309",
    nationalization: "8",
    normalized: "8 create +-0 6 7 000 something 5 new 3 today 0 boiyo 9"
  })
})