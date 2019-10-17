"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressions_1 = require("../tools/expressions");
/**
 * @author Sigkar <https://github.com/sigkar>
 * @param phoneFormatString
 * @returns {interface} phoneFormat
 */
exports.testPhoneFormat = (phoneFormatString) => {
    const constructorDigits = phoneFormatString.match(expressions_1.phoneDigitCount);
    const digits = constructorDigits && constructorDigits[0] ? constructorDigits[0].length : 0;
    return {
        digits
    };
};
/**
 * @author Sigkar <https://github.com/sigkar>
 * @param phoneNumber
 * @param format
 * @returns onlyPhoneDigits: string
 */
exports.phone = (phoneNumber, format) => {
    const onlyPhoneDigits = phoneNumber.toString().replace(/\D/g, "");
    const phoneFormat = exports.testPhoneFormat(format);
    return onlyPhoneDigits;
};
//# sourceMappingURL=phone.js.map