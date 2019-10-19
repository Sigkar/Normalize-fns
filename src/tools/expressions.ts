/**
 * @author Sigkar <https://github.com/sigkar>
 */
export const phoneDigitCount = /[NAD]$|(\w)\1*|''|'(''|[^'])+('|$)|./g;
export const testPhoneString = /[NAD]/g;
export const onlyDigits = /\D/gim;
