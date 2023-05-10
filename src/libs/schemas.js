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

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Este campo es requerido")
    .min(8, "La contraseña debe ser de al menos 8 caracteres")
    .max(16, "La contraseña no debe de exceder los 16 caracteres"),
  confirmPassword: yup
    .string()
    .required("Este campo es requerido")
    .min(8, "La contraseña debe ser de al menos 8 caracteres")
    .max(16, "La contraseña no debe de exceder los 16 caracteres")
    .oneOf([yup.ref("password")], "Las contraseñas no son iguales"),
});

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .email()
    .required("Escriba su correo electronico para poder acceder al sistema"),
  password: yup.string().required("Escriba su contraseña para poder acceder al sistema"),
});

export const patientSchema = yup.object().shape({
  id: yup.string(),
  firstName: yup.string().required("Escriba el nombre del paciente"),
  middleName: yup.string(),
  lastName: yup.string().required("Escriba el apellido del paciente"),
  dateOfBirth: yup.string().required("Elija la fecha de nacimiento del paciente"),
  email: yup.string(),
  phone: yup.object().shape({
    id: yup.string(),
    isPrimary: yup.string(),
    type: yup.string(),
    countryCode: yup.string(),
    phoneNumber: yup.string().required("Escriba el numero de telefono del paciente"),
  }),
  address: yup.object().shape({
    id: yup.string(),
    countryId: yup.string(),
    addressLineOne: yup.string().required("Escriba la direccion del paciente"),
    addressLineTwo: yup.string(),
    stateOrCity: yup.string().required("Escriba la ciudad en la que reside"),
    townOrMunicipality: yup.string().required("Escriba el municipio en el que reside"),
    zipCode: yup.string(),
  }),
});

export const specialtySchema = yup.object().shape({
  name: yup.string().required("Este campo es requerido"),
  description: yup.string().required("Este campo es requerido"),
});

export const serviceSchema = yup.object().shape({
  serviceName: yup.string().required("Este campo es requerido"),
  serviceDescription: yup.string().required("Este campo es requerido"),
  specialtyId: yup.string().required("Este campo es requerido"),
  price: yup.number().required("Este campo es requerido"),
});
