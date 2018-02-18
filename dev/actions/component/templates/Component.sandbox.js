import React from 'react';
import <%= name %> from './index';



export default {
  default: {
    <% if (type.modal) {%>testing: true,
    props: {
      isOpen: false
    },
    handlers: {
      onRequestClose: ({ isOpen }, wrapperState, { setProps, setState }) => () => {
        setProps({ isOpen: !isOpen });
      }
    },
    wrapperHandlers: {
      toggleOpen: ({ isOpen }, wrapperState, { setState, setProps }) => () => {
        setProps({ isOpen: !isOpen });
      }
    },
    template: (props, { toggleOpen }) => (
      <div>
        <button type="button" onClick={toggleOpen}>Show <%= name %></button>
        <<%= name %> {...props} />
      </div>
    )<% } else {%>testing: true,
    props: {
      // some default props
    },
    handlers: {
      //someHandlerName: (props, wrapperState, { setProps, setState }) => (...someArguments) => {
      //  // do something useful
      //}
    },
    wrapperState: {
    },
    wrapperHandlers: {
      //someHandlerName: (props, wrapperState, { setProps, setState }) => (...someArguments) => {
      //  // do something useful
      //}
    },
    template: (props, wrapperState) => (
      <div>
        <<%= name %>
          {...props}
        />
      </div>
    )<% } %>
  }
};
