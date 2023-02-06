function doctorsFormattedData(data) {
  return data?.map((item) => {
    return {
      value: item.id,
      label: `${item.firstName} ${item.lastName}`,
    };
  });
}

export { doctorsFormattedData };
