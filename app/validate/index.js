import compose from './compose-validators';



export default (...validators) => {
  const validate = compose(...validators);

  return (value) => validate(value) === undefined;
};
