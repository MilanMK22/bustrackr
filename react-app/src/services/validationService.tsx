const validateInput = (searchValue: string): boolean => {
  return /^\d{4}$/.test(searchValue);
};

export default validateInput;
