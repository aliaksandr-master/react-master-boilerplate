export default (accuracy = 2, sep = ',', point = '.') => {
  accuracy = Number(accuracy) || 0;

  return (value) => {
    const sigh = value < 0 ? '-' : '';

    value = Math.abs(value).toFixed(accuracy);

    const beforeDot = String(parseInt(value, 10));
    const i = beforeDot.length > 3 ? beforeDot.length % 3 : 0;
    const intPart = (i ? beforeDot.substr(0, i) + sep : '') + beforeDot.substr(i).replace(/(\d{3})(?=\d)/g, `$1${sep}`);
    const floatPartWithDot = (accuracy ? point + Math.abs(value - beforeDot).toFixed(accuracy).slice(2) : '');

    return sigh + intPart + floatPartWithDot;
  };
};
