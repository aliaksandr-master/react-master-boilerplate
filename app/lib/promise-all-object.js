export default (objectWithPromises) => {
  const typeArray = Array.isArray(objectWithPromises);
  const keys = Object.keys(objectWithPromises);

  return Promise.all(keys.map((propName) => Promise.resolve(objectWithPromises[propName])))
    .then((results) =>
      results.reduce((object, result, index) => {
        object[keys[index]] = result;

        return object;
      }, typeArray ? [] : {})
    );
};
