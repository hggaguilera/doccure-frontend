export const baseCountryData = {
  value: "86a95fa9-4711-4e3b-8ede-f0ef9bad7bc6",
  label: "Nicaragua",
  country_abbr: "NI",
};

export const patientInitialValues = () => {
  return {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: {
      isPrimary: "yes",
      type: "mobile",
    },
    address: {
      countryId: baseCountryData.value,
    },
  };
};

export const doctorInitialValues = () => {
  return {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    prefix: "",
    email: "",
    isSystemUser: true,
    phone: {
      countryCode: "",
      phoneNumber: "",
    },
    address: {
      addressLineOne: "",
      addressLineTwo: "",
      stateOrCity: "",
      townOrMunicipality: "",
      zipCode: "",
    },
    specialties: [],
  };
};
