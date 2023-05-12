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
  firstName: yup.string().required(),
  middleName: yup.string(),
  lastName: yup.string().required(),
  dateOfBirth: yup.string().required(),
  email: yup.string().required(),
  phone: yup.object().shape({
    id: yup.string(),
    isPrimary: yup.string(),
    type: yup.string(),
    countryCode: yup.string(),
    phoneNumber: yup.string().required(),
  }),
  address: yup.object().shape({
    id: yup.string(),
    countryId: yup.string(),
    addressLineOne: yup.string().required(),
    addressLineTwo: yup.string(),
    stateOrCity: yup.string().required(),
    townOrMunicipality: yup.string().required(),
    zipCode: yup.string(),
  }),
});
export const doctorSchema = yup.object().shape({
  firstName: yup.string().required(),
  middleName: yup.string(),
  lastName: yup.string().required(),
  prefix: yup.string().required(),
  dateOfBirth: yup.string().required(),
  isSystemUser: yup.bool().required(),
  email: yup.string().required(),
  phone: yup.object().shape({
    countryCode: yup.string(),
    phoneNumber: yup.string().required(),
  }),
  address: yup.object().shape({
    addressLineOne: yup.string().required(),
    addressLineTwo: yup.string(),
    stateOrCity: yup.string().required(),
    townOrMunicipality: yup.string().required(),
    zipCode: yup.string(),
  }),
  specialties: yup.array(yup.string()).min(1).required(),
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
