"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Sigkar <https://github.com/sigkar>
 */
exports.phoneDigitCount = /[NAD]$|(\w)\1*|''|'(''|[^'])+('|$)|./g;
exports.testPhoneString = /[NAD]/g;
exports.onlyDigits = /\D/gim;
//# sourceMappingURL=expressions.js.map