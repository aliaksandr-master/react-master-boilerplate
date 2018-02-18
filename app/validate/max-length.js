export default (max, message = `Must be ${max} characters or less`) => (value) => {
  value = String(value);

  return value && value.length > max ? message : undefined;
};
