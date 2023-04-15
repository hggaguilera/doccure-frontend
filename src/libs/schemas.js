import * as yup from "yup";

export const bookAppointmentSchema = yup.object().shape({
  patientName: yup.string().required("Escriba un nombre"),
  email: yup.string().email().required("Especifique una direccion de correo electronico"),
  phone: yup
    .object()
    .shape({ dialCode: yup.string(), phoneNumber: yup.string() })
    .required("Ingrese un numero de telefono valido"),
  doctorName: yup.string().required("Elija a un Doctor"),
  service: yup.string().required("Especifique el Servicio"),
  date: yup.string().required("Especifique una Fecha"),
  time: yup.string().required("Especifique la Hora"),
});

export const contactUsSchema = yup.object().shape({
  from_name: yup.string().required("Escriba su nombre"),
  reply_to: yup.string().email().required("Escriba su email"),
  subject: yup.string(),
  comments: yup.string().required("Escriba su consulta o comentario"),
});

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .email()
    .required("Escriba su correo electronico para poder acceder al sistema"),
  password: yup.string().required("Escriba su contraseña para poder acceder al sistema"),
});
