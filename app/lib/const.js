import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import isNumber from 'lodash/isNumber';
import isNaN from 'lodash/isNaN';
import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import isObejct from 'lodash/isObject';
import forEach from 'lodash/forEach';
import reduce from 'lodash/reduce';
import values from 'lodash/values';
import cloneDeep from 'lodash/cloneDeep';
import assertTrimmedNonEmptyString from '../asserts/assert-trimmed-non-empty-string';
import assertPlainObject from '../asserts/assert-is-plain-object';
import assertUniq from '../asserts/assert-uniq';
import assertVariants from '../asserts/assert-variants';



const TYPE = {
  FUNC: 'function',
  NUMBER: 'number',
  STRING: 'string',
  BOOLEAN: 'boolean',
  ARRAY: 'array',
  OBJECT: 'object'
};


const constant = (constName, object, { empty = false, uniq = true, type = null, allowProps = [], own = true } = {}) => {
  if (!__ASSERTS_ENABLED__) {
    return object;
  }

  const CONST_ERROR_PREF = `CONST [${constName}]: `;

  assertTrimmedNonEmptyString(`${CONST_ERROR_PREF}constName`, constName);
  if (!Array.isArray(object)) {
    assertPlainObject(`${CONST_ERROR_PREF}object`, object);
  }

  if (!empty && isEmpty(object)) {
    throw new Error(`${CONST_ERROR_PREF}constant is empty`);
  }

  if (type !== null) {
    type = Array.isArray(type) ? type : [ type ];

    type.forEach((v) => {
      assertVariants(values(TYPE), `${CONST_ERROR_PREF}type`, v);
    });
  }

  allowProps.forEach((prop) => {
    assertTrimmedNonEmptyString(`${CONST_ERROR_PREF}allowProp`, prop);
  });

  forEach(object, (v) => {
    if (type === null) {
      return;
    }

    if (type.some((type) =>
      (type === TYPE.FUNC && isFunction(v))
      || (type === TYPE.NUMBER && isNumber(v) && !isNaN(v))
      || (type === TYPE.STRING && isString(v))
      || (type === TYPE.BOOLEAN && isBoolean(v))
      || (type === TYPE.ARRAY && Array.isArray(v))
      || (type === TYPE.OBJECT && isPlainObject(v))
    )) {
      return;
    }

    throw new Error(`${CONST_ERROR_PREF}invalid value. must have "${type}" type`);
  });

  if (uniq) {
    assertUniq(`${CONST_ERROR_PREF}values`, values(object));
  }

  const has = (target, propName) => {
    if (Object.prototype.hasOwnProperty.call(target, propName)) {
      return true;
    }

    if (Object.prototype.hasOwnProperty(propName) || allowProps.includes(propName)) {
      return true;
    }

    if ((Array.isArray(target) && propName === 'length')) { // only for iterators supporting
      return true;
    }

    if (!own && target[propName] !== undefined) {
      return true;
    }

    return false;
  };

  return new Proxy(object, {
    has (target, propName) {
      return has(target, propName);
    },
    get (target, propName) {
      if (has(target, propName)) {
        return target[propName];
      }

      if (propName === 'length' || propName === 'constructor' || propName === '@@toStringTag') {
        return undefined;
      }

      try {
        propName = String(propName);
      } catch (err) {
        if (/Symbol/.test(err.message)) {
          return undefined;
        }

        throw err;
      }

      throw new Error(`${CONST_ERROR_PREF}there is no property "${propName}"`);
    },
    set (target, propName, _value) {
      throw new Error(`${CONST_ERROR_PREF}you must not change const value of "${propName}"`);
    }
  });
};


let mkObjectLikeConstant = function () {};



const mkValueLikeConstant = function (constName, obj, value, name, options) {
  if (value != null && isObejct(value)) {
    value = mkObjectLikeConstant(constName, value, options);
  }

  Object.defineProperty(obj, name, {
    enumerable: true,
    set (_name, _value) {
      throw new Error(`CONST ${constName}: You can't modify constant`);
    },
    get () {
      return value;
    }
  });

  return obj;
};



mkObjectLikeConstant = function (constName, obj, options) {
  obj = reduce(obj, (obj, value, key) => mkValueLikeConstant(constName, obj, value, key, options), Array.isArray(obj) ? [] : {});

  if (Array.isArray(obj)) {
    return obj;
  }

  if (options.checkUndefinedProps) {
    return constant(constName, obj, { uniq: false, empty: true });
  }

  return obj;
};



export const recursiveConst = (constName, object, options = {}) => {
  if (!__ASSERTS_ENABLED__) {
    return object;
  }

  if (object == null || !isObejct(object)) {
    throw new TypeError(`CONST ${constName}: value must be an object`);
  }

  return mkObjectLikeConstant(constName, object, options);
};


let _recursiveUnpackConst = () => {};


const unpackValueConst = (obj, value, key) => {
  if (value != null && isObejct(value)) {
    value = _recursiveUnpackConst(value);
  }

  obj[key] = value;

  return cloneDeep(obj);
};

_recursiveUnpackConst = (object) => {
  if (!__ASSERTS_ENABLED__) {
    return object;
  }

  return reduce(object, (obj, value, key) => unpackValueConst(obj, value, key), Array.isArray(object) ? [] : {});
};


export const recursiveUnpackConst = _recursiveUnpackConst;



export default constant;
