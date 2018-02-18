export default (min, message = `Must be at least ${min} characters`) => (value) => {
  value = String(value);

  return value && value.length < min ? message : undefined;
};
