import * as yup from "yup";

export const bookAppointmentSchema = yup.object().shape({
  patientName: yup.string().required("Escriba un nombre"),
  email: yup.string().email().required("Especifique una direccion de correo electronico"),
  phoneNumber: yup.string().required("Ingrese un numero de telefono valido"),
  doctorName: yup.string().required("Elija a un Doctor"),
  date: yup.string().required("Especifique una Fecha"),
});
