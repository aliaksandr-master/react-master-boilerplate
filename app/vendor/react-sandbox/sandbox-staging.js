/* eslint-env jest, browser */
/* eslint-disable react/no-set-state */
import React, { Component } from 'react';



const wrapHandlers = (handlers, host, props, sysProps, actions) =>
  Object.keys(handlers).reduce((handlers, handlerName) => {
    const handler = host[handlerName];

    handlers[handlerName] = (...args) =>
      handler(props, sysProps, actions)(...args);

    return handlers;
  }, {});


export const wrapSandbox = (sandbox) =>
  Object.keys(sandbox)
    .filter((variationName) => sandbox[variationName].testing !== false)
    .map((variationName) => {
      const variation = sandbox[variationName];

      const sysProps = variation.wrapperState || {};
      const sysHandlers = variation.wrapperHandlers || {};
      const props = variation.props || {};

      const handlers = variation.handlers || {};

      return ({
        name: variationName,
        props: { ...props, ...handlers },
        template: () => class SandboxTestComponent extends Component {
          componentWillMount () {
            this.setState({
              sysProps: { ...sysProps, ...sysHandlers },
              props: this.props
            });
          }

          render () {
            const sysProps = (this.state || {}).sysProps;
            const props = (this.state || {}).props;

            const actions = {
              setState: (state) => {
                this.setState({ sysProps: { ...sysProps, ...state } });
              },
              setProps: (state) => {
                this.setState({ props: { ...props, ...state } });
              }
            };

            return variation.template(
              {
                ...props,
                ...wrapHandlers(handlers, props, props, sysProps, actions)
              },
              {
                ...sysProps,
                ...wrapHandlers(sysHandlers, sysProps, props, sysProps, actions)
              }
            );
          }
        }
      });
    });
