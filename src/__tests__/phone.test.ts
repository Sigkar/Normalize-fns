import { phone } from "../normalization/phone";

test('Phone should be able to be called', () => {
  expect(phone()).toBeTruthy();
})