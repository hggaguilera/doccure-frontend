import dayjs from "dayjs";

function doctorsFormattedData(data) {
  return data?.map((item) => ({
    value: item.id,
    label: `${item.firstName} ${item.lastName}`,
  }));
}

function servicesFormattedData(data) {
  return data?.map((item) => ({
    value: item.id,
    label: item.serviceName,
  }));
}

/**
 * It takes a date and time and returns a datetime object
 * @param date - The date object that you want to convert to a datetime object
 * @param time - The time of the event
 * @returns A string in the format of "YYYY-MM-DD HH:mm:ss"
 */
function getDateTimeFromDateAndTime(date, time) {
  if (!date) {
    throw new Error("Could not get datetime. Date param was not provided");
  }

  if (!time) {
    throw new Error("Could not get datetime. Time params was not provided");
  }

  const dateObj = dayjs(date).format("YYYY-MM-DD");
  const timeObj = dayjs(time).set("seconds", 0).set("milliseconds", 0).format("HH:mm:ss");

  return dayjs(`${dateObj} ${timeObj}`).format("YYYY-MM-DD HH:mm:ss Z");
}

function buildAppointmentPayload(data) {
  return {
    name: data.patientName,
    email: data.email,
    countryCode: `+${data.phone.dialCode}`,
    phoneNumber: data.phone.phoneNumber,
    doctor: data.doctorName,
    service: data.service,
    date: getDateTimeFromDateAndTime(data.date, data.time),
  };
}

/**
 * This function calculates the age of a person based on their date of birth
 * @param dateOfBirth - The parameter `dateOfBirth` is a string representing a date of birth in the
 * format "YYYY-MM-DD".
 * @returns the age of a person based on their date of birth. It calculates the difference between the
 * current date and the date of birth in years
 */
function calculateAge(dateOfBirth) {
  const currentDate = dayjs();
  const dob = dayjs(dateOfBirth);

  if (!dob.isValid()) {
    return "";
  }

  return currentDate.diff(dob, "year");
}

/**
 * The function takes an address object and returns a formatted full address string.
 * @param addressObj - an object containing the following properties:
 * @returns The function `fullAddress` is returning a string that concatenates the `addressLineOne`,
 * `townOrMunicipality`, `stateOrCity`, and `zipCode` properties of the `addressObj` parameter
 * separated by commas.
 */
function formattedFullAddress(addressObj) {
  const { addressLineOne, townOrMunicipality, stateOrCity, zipCode } = addressObj;
  return `${addressLineOne}, ${townOrMunicipality}, ${stateOrCity}, ${zipCode}`;
}

/**
 * The function takes a phone number object and returns the full phone number with country code and the
 * phone number without the country code.
 * @param phoneNumberObj - The `phoneNumberObj` parameter is an object that contains two properties:
 * `countryCode` and `phoneNumber`. These properties represent the country code and phone number of a
 * phone number.
 * @returns An object with two properties: "fullNumber" which is a string concatenation of the
 * "countryCode" and "phoneNumber" properties of the input object, and "phoneNumber" which is the same
 * as the "phoneNumber" property of the input object.
 */
function formattedPhoneNumber(phoneNumberObj) {
  const { countryCode, phoneNumber } = phoneNumberObj;

  return {
    fullNumber: `${countryCode}${phoneNumber}`,
    phoneNumber,
  };
}

export {
  doctorsFormattedData,
  servicesFormattedData,
  getDateTimeFromDateAndTime,
  buildAppointmentPayload,
  calculateAge,
  formattedFullAddress,
  formattedPhoneNumber,
};
