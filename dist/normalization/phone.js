"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressions_1 = require("../tools/expressions");
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
exports.testPhoneFormat = (phoneFormatString, unformattedDigits, options) => {
    const unformattedCharsOnly = phoneFormatString
        .replace(/\W/g, "")
        .split("");
    let currentIndex = 0;
    let nationalization = "";
    let areaCode = "";
    let digits = "";
    // Digit case
    if (unformattedCharsOnly.join("").length < unformattedDigits.length) {
        unformattedDigits = unformattedDigits
            .split("")
            .slice(unformattedDigits.length - unformattedCharsOnly.join("").length, unformattedDigits.length)
            .join("");
    }
    const split = phoneFormatString.match(expressions_1.phoneDigitCount);
    const digitArray = unformattedDigits
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
    let final = false;
    let slice = "";
    const normalizedArray = split.map((splitPhone) => {
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
        let iteration = splitPhone.toString();
        const phoneStringLengthTest = splitPhone.match(expressions_1.testPhoneString);
        if (phoneStringLengthTest !== null) {
            if (splitPhone.match(/([N])/g)) {
                nationalization = !nationalization
                    ? slice.toString()
                    : nationalization.toString() + slice.toString();
                iteration = slice;
            }
            else if (splitPhone.match(/([A])/g)) {
                areaCode = !areaCode
                    ? slice.toString()
                    : areaCode.toString() + slice.toString();
                iteration = slice;
            }
            else if (splitPhone.match(/([D])/g)) {
                digits = !digits
                    ? slice.toString()
                    : digits.toString() + slice.toString();
                iteration = slice;
            }
            currentIndex = currentIndex + splitPhone.length;
        }
        if ((digits + areaCode + nationalization).toString().length ===
            unformattedDigits.length) {
            final = true;
        }
        return iteration;
    });
    const normalized = normalizedArray.join("");
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
exports.phone = (phoneNumber, format, options) => {
    if (!options) {
        options = "";
    }
    const onlyPhoneDigits = phoneNumber
        .toString()
        .replace(expressions_1.onlyDigits, "");
    const phoneFormat = exports.testPhoneFormat(format, onlyPhoneDigits, options);
    return phoneFormat;
};
//# sourceMappingURL=phone.js.map