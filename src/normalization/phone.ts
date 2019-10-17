import {phoneDigitCount} from "../tools/expressions";
import {IPhoneFormatMatch} from "../tools/phoneInterfaces";

/**
 * @author Sigkar <https://github.com/sigkar>
 * @param phoneFormatString
 * @returns {interface} phoneFormat
 */
export const testPhoneFormat = (phoneFormatString: string) => {
  const constructorDigits: string[] = phoneFormatString.match(phoneDigitCount);
  const digits: number = constructorDigits && constructorDigits[0] ? constructorDigits[0].length : 0;

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
export const phone = (phoneNumber: string | number, format: string) => {
  const onlyPhoneDigits: string = phoneNumber.toString().replace(/\D/g, "");
  const phoneFormat: IPhoneFormatMatch = testPhoneFormat(format);
  return onlyPhoneDigits;
};
