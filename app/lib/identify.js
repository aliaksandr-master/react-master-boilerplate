export default (base = 'id-', idAttr = 'id') => (value, index) => ({
  ...value,
  [idAttr]: `${base}${index}`
});
