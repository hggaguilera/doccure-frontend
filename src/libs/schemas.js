import * as yup from "yup";

export const bookAppointmentSchema = yup.object().shape({
  patientName: yup.string().required("Escriba un nombre"),
  email: yup.string().email().required("Especifique una direccion de correo electronico"),
  phoneNumber: yup.string().required("Ingrese un numero de telefono valido"),
  doctorName: yup.string().required("Elija a un Doctor"),
  date: yup.string().required("Especifique una Fecha"),
  time: yup.string().required("Especifique una Hora"),
});

export const contactUsSchema = yup.object().shape({
  from_name: yup.string().required("Escriba su nombre"),
  reply_to: yup.string().email().required("Escriba su email"),
  subject: yup.string(),
  comments: yup.string().required("Escriba su consulta o comentario"),
});
