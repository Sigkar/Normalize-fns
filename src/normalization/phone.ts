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
  const unformattedCharsOnly: string[] = phoneFormatString
    .replace(/\W/g, "")
    .split("");
  let currentIndex: number = 0;
  let nationalization: string = "";
  let areaCode: string = "";
  let digits: string = "";

  // Digit case
  if (unformattedCharsOnly.join("").length < unformattedDigits.length) {
    unformattedDigits = unformattedDigits
      .split("")
      .slice(
        unformattedDigits.length - unformattedCharsOnly.join("").length,
        unformattedDigits.length
      )
      .join("");
  }

  const split: string[] = phoneFormatString.match(phoneDigitCount);

  const digitArray: string[] = unformattedDigits
    .split("")
    .map((digit) => digit.toString());

  if (split === null) {
    return {
      areaCode: "false",
      digits: "false",
      nationalization: "false",
      normalized: "false"
    };
  }
  let final: boolean = false;
  let slice: string = "";
  const normalizedArray: string[] = split.map((splitPhone) => {
    if (final) {
      return "";
    }
    slice = digitArray
      .slice(currentIndex, currentIndex + splitPhone.length)
      .join("")
      .toString();
    if (typeof slice === "undefined") {
      slice = "";
    }
    // Slice only allows digits so call iteration
    let iteration: string = splitPhone.toString();
    const phoneStringLengthTest: string | string[] = splitPhone.match(
      testPhoneString
    );
    if (phoneStringLengthTest !== null) {
      if (splitPhone.match(/([N])/g)) {
        nationalization = !nationalization
          ? slice.toString()
          : nationalization.toString() + slice.toString();
        iteration = slice;
      } else if (splitPhone.match(/([A])/g)) {
        areaCode = !areaCode
          ? slice.toString()
          : areaCode.toString() + slice.toString();
        iteration = slice;
      } else if (splitPhone.match(/([D])/g)) {
        digits = !digits
          ? slice.toString()
          : digits.toString() + slice.toString();
        iteration = slice;
      }
      currentIndex = currentIndex + splitPhone.length;
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
export const phone = (phoneNumber: string | number, format: string, options?: string) => {
  if (!options) {options = ""; }
  const onlyPhoneDigits: string = phoneNumber
    .toString()
    .replace(onlyDigits, "");
  const phoneFormat: IPhoneFormatMatch | string = testPhoneFormat(
    format,
    onlyPhoneDigits,
    options
  );
  return phoneFormat;
};
