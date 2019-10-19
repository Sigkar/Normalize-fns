import {
  onlyDigits,
  phoneDigitCount,
  testPhoneString
} from "../tools/expressions";
import { IPhoneFormatMatch } from "../tools/phoneInterfaces";

/**
 * @author Sigkar <https://github.com/sigkar>
 * @param phoneFormatString
 * @param unformattedDigits
 * @param options
 *
 * @example
 *  testPhoneFormat(11238675309, "+N (AAA) DDD-DDDD")
 *    // Returns +1 (123) 867-5309
 *  testPhoneFormat(11238675309, "++N (A A A) D D D D D D D", "SPLIT_DIGITS")
 *    // Returns
 *    //{
 *    //  areaCode: "123",
 *    //  digits: "8675309",
 *    //  nationalization: "1"
 *    //  normalized: "++1 (1 2 3) 8 6 7 5 3 0 9"
 *    //}
 *
 * @returns {Object<IPhoneFormatMatch> | String}
 */
export const testPhoneFormat = (
  phoneFormatString: string,
  unformattedDigits: string,
  options?: string
) => {
  const splitPhone: Array<String> = phoneFormatString.match(phoneDigitCount);
  let currentIndex: number = 0;
  let nationalization: string = "",
    areaCode: string = "",
    digits: string = "";
  const digitArray: Array<string> = unformattedDigits
    .split("")
    .map(digit => digit.toString());

  if (splitPhone === null) {
    return {
      areaCode: "false",
      digits: "false",
      nationalization: "false",
      normalized: "false"
    };
  }
  let final: boolean = false;
  let slice: string = "";
  const normalizedArray: Array<string> = splitPhone.map(splitPhone => {
    slice = digitArray
      .slice(currentIndex, currentIndex + splitPhone.length)
      .join("")
      .toString();
    if (typeof slice === "undefined") {
      slice = "";
    }
    let iteration: string = splitPhone.toString();
    const phoneStringLengthTest: string | Array<String> = splitPhone.match(
      testPhoneString
    );
    if (phoneStringLengthTest !== null) {
      if (splitPhone.match(/([N])/g) && !nationalization) {
        nationalization = slice;
        iteration = slice;
      } else if (splitPhone.match(/([A])/g) && !areaCode) {
        areaCode = slice;
        iteration = slice;
      } else if (splitPhone.match(/([D])/g)) {
        digits = !digits
          ? slice.toString()
          : digits.toString() + slice.toString();
        iteration = slice;
      }
      currentIndex = currentIndex + splitPhone.length;
    }
    if (final) {
      // TODO: Break a for-loop instead of map
      return "";
    }
    if (
      (digits + areaCode + nationalization).toString().length ===
      unformattedDigits.length
    ) {
      final = true;
    }
    return iteration;
  });

  const normalized: string = normalizedArray.join("");
  switch (options) {
    case "SPLIT_DIGITS":
      return {
        areaCode,
        digits,
        nationalization,
        normalized
      };
    default:
      return normalized;
  }
};

/**
 * @author Sigkar <https://github.com/sigkar>
 * @param phoneNumber
 * @param format
 * @returns onlyPhoneDigits: string
 */
export const phone = (phoneNumber: string | number, format: string) => {
  const onlyPhoneDigits: string = phoneNumber
    .toString()
    .replace(onlyDigits, "");
  const phoneFormat: IPhoneFormatMatch | string = testPhoneFormat(
    format,
    onlyPhoneDigits
  );
  return phoneFormat;
};
