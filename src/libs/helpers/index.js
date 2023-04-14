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

export {
  doctorsFormattedData,
  servicesFormattedData,
  getDateTimeFromDateAndTime,
  buildAppointmentPayload,
};
