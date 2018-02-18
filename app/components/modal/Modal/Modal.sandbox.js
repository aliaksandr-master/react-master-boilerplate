/* eslint-disable react/display-name, react/jsx-no-bind */

import React from 'react';
import Modal from './Modal';



export default {
  default: {
    props: {
      isOpen: true
    },
    handlers: {
      onRequestClose: ({ isOpen }, wrapperState, { setState, setProps }) => () => {
        setProps({ isOpen: false });
      }
    },
    wrapperState: {},
    wrapperHandlers: {
      toggleOpen: ({ isOpen }, wrapperState, { setState, setProps }) => () => {
        setProps({ isOpen: !isOpen });
      }
    },
    template: (props, { toggleOpen }) => (<div>
      <button type="button" onClick={toggleOpen}>Show Modal</button>

      <Modal{...props}>
        Hello world
      </Modal>
    </div>)
  }
};
