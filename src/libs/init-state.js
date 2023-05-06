export const patientInitialValues = (countries = []) => {
  const nic = countries.find((item) => item.label === "Nicaragua");

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
      countryId: nic?.value,
    },
  };
};
