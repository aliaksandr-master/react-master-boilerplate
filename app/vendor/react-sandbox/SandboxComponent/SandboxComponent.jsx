/*eslint-disable react/no-array-index-key, react/jsx-no-bind*/
import React from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';
import reduce from 'lodash/reduce';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import isError from 'lodash/isError';
import { SubmissionError } from 'redux-form';
import { Link } from 'react-composite-router';
import SandboxComponentPropsForm from '../SandboxComponentPropsForm';
import { RESPONSE_STATE } from './SandboxComponent.const';
import './SandboxComponent.less';



const jsonStringify = (value) => {
  try {
    return JSON.stringify(value, null, 2);
  } catch (err) {
    return `ERROR: ${err.message}`;
  }
};


const SandboxComponent = ({
  responseState,
  variations,
  setNewPropsAction,
  callHandlerAction,
  cleanHandlersCallStack,
  handlerCallStack,
  CurrentComponent,
  handlers,
  sysProps,
  props,
  component,
  backgroundColor,
  handleColorChange,
  wrapperHandlers,
  componentId,
  selfID,
  resetFormValues,
  updateSysPropsAction
}) => {
  const actions = {
    setState: (name, value) => updateSysPropsAction(name, value),
    setProps: (props) => {
      setNewPropsAction(props);
      resetFormValues();
    }
  };


  const wrapperProps =  {
    ...sysProps,
    ...reduce(wrapperHandlers, (handlers, handler, handlerName) => {
      handlers[handlerName] = (...args) => {
        callHandlerAction(handlerName, cloneDeep(args));
        return handler(props, sysProps, actions)(...args);
      };

      return handlers;
    }, {})
  };

  const componentProps = {
    ...props,
    ...reduce(handlers, (handlers, handler, handlerName) => {
      handlers[handlerName] = (...args) => {
        callHandlerAction(handlerName, cloneDeep(args));
        return handler(props, sysProps, actions)(...args);
      };

      return handlers;
    }, {})
  };

  return (
    <div className="SandboxComponent">
      {responseState !== RESPONSE_STATE.OK
        ? (
          <div>{`component with id="${componentId}" is absent`}</div>
        ) : (
          <div>
            <div className="SandboxComponent__varMenu">
              {!variations || !variations.length || (variations.length === 1 && variations[0] === 'default')
                ? (
                  null
                ) : (
                  variations.map((variation, index) => (
                    <Link reload className="SandboxComponent__var" activeClass="SandboxComponent__var--active" key={index} state="sandbox.component" params={{ variation }}>{variation}</Link>
                  ))
                )
              }
            </div>
            <div className="SandboxComponent__componentWr">
              <div className="SandboxComponent__h">&lt;{component.name} /&gt;</div>
              <div className="SandboxComponent__component" style={{ backgroundColor }}>
                {CurrentComponent(componentProps, wrapperProps)}
              </div>
              <div className="SandboxComponent__colors">
                {
                  [ 'white', 'red', 'grey', 'violet', 'black', 'green' ].map((background) => (
                    <span onClick={handleColorChange(background)} className="SandboxComponent__color" key={background} style={{ background }} />
                  ))
                }
              </div>
            </div>

            <div className="SandboxComponent__infoWr">
              <div className="SandboxComponent__info">
                <div className="SandboxComponent__label">Props Form:</div>
                <SandboxComponentPropsForm
                  onSubmit={(values) => Promise.resolve()
                    .then(() => {
                      let props;

                      try {
                        props = JSON.parse(values.props);
                      } catch (_err) {
                        throw new SubmissionError({ props: 'invalid JSON' });
                      }

                      setNewPropsAction(props);

                      return null;
                    })
                  }
                  form={selfID}
                  initialValues={{ props: JSON.stringify(props, null, 4) }}
                />
              </div>
              <div className="SandboxComponent__info">
                {Boolean(handlerCallStack.length) && (
                  <div>
                    <div className="SandboxComponent__label">
                      Handlers Call Stack ({handlerCallStack.length}):
                      <a className="SandboxComponent__callStackClear" onClick={() => cleanHandlersCallStack()}>clean</a>
                    </div>
                    <div className="SandboxComponent__callStack">
                      {
                        handlerCallStack.map((callInfo, index) => (
                          <div className={`SandboxComponent__callStackItem ${index < 5 ? 'SandboxComponent__callStackItem--opened' : ''}`} key={index}>
                            <div className="SandboxComponent__callStackItemCounter">{handlerCallStack.length - index}.</div>
                            <div className="SandboxComponent__callStackItemH">{callInfo.name}</div>
                            <div className="SandboxComponent__callStackItemArgs">
                              {
                                callInfo.args.map((arg, argIndex) => (
                                  <div className="SandboxComponent__callStackItemArg" key={argIndex}>
                                    <div className="SandboxComponent__callStackItemArgNumber">arg {argIndex + 1}:</div>
                                    <div className="SandboxComponent__callStackItemArgValueWr">
                                      <pre className="SandboxComponent__callStackItemArgValue">{isError(arg) ? arg.message : jsonStringify(arg)}</pre>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
                {!isEmpty(sysProps) && (
                  <div>
                    <div className="SandboxComponent__label">Wrapper Store State:</div>
                    <pre className="SandboxComponent__pre">{jsonStringify(wrapperProps)}</pre>
                  </div>
                )}
              </div>
            </div>
            <div className="SandboxComponent__label">Template:</div>
            <pre className="SandboxComponent__pre">{reactElementToJSXString(CurrentComponent(componentProps, wrapperProps))}</pre>
          </div>
        )
      }
    </div>
  );
};



SandboxComponent.propTypes = {
  selfID: PropTypes.string.isRequired,
  props: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired,
  sysProps: PropTypes.object.isRequired,
  handlerCallStack: PropTypes.arrayOf(PropTypes.shape({ args: PropTypes.array.isRequired, name: PropTypes.string.isRequired })).isRequired,
  handlers: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  wrapperHandlers: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  variations: PropTypes.array.isRequired,
  handleColorChange: PropTypes.func,
  callHandlerAction: PropTypes.func,
  resetFormValues: PropTypes.func,
  cleanHandlersCallStack: PropTypes.func,
  backgroundColor: PropTypes.string,
  updateSysPropsAction: PropTypes.func.isRequired,
  responseState: PropTypes.string.isRequired,
  componentId: PropTypes.string.isRequired,
  setNewPropsAction: PropTypes.func.isRequired,
  CurrentComponent: PropTypes.func.isRequired
};



SandboxComponent.defaultProps = {
};



export default SandboxComponent;
