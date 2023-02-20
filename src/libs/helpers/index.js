import moment from "moment";

function doctorsFormattedData(data) {
  return data?.map((item) => {
    return {
      value: item.id,
      label: `${item.firstName} ${item.lastName}`,
    };
  });
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

  const dateObj = moment(date).format("YYYY-MM-DD");
  const timeObj = moment(time).format("HH:mm:ss");

  return moment(`${dateObj} ${timeObj}`, "YYYY-MM-DD HH:mm:ss Z");
}

function buildAppointmentPayload(data) {
  return {
    name: data.patientName,
    email: data.email,
    countryCode: `+${data.phone.dialCode}`,
    phoneNumber: data.phone.phoneNumber,
    doctor: data.doctorName,
    date: getDateTimeFromDateAndTime(data.date, data.time),
  };
}

export { doctorsFormattedData, getDateTimeFromDateAndTime, buildAppointmentPayload };
