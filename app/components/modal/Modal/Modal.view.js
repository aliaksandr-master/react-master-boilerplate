import React from 'react';
import PropTypes from 'prop-types';
import './Modal.view.less';
import ReactModal from 'react-modal';
import isFunction from 'lodash/isFunction';
import classnames from '../../../vendor/classnames';
import { THEME } from './Modal.const';



ReactModal.defaultStyles = { // reset default react-modal lib styles
  overlay: {},
  content: {}
};


const themesMap = {
  [THEME.DEFAULT]: 'Modal--theme-default'
};

const themeAnimationMap = {
  [THEME.DEFAULT]: 210
};



const Modal = ({
  children,
  handleCloseClick,
  handleOverlayClick,
  hasCloseButton,
  width,
  theme,
  isOpen,
  overlayClosing
}) => {
  return (
    <ReactModal
      className={classnames('Modal', themesMap[theme])}
      closeTimeoutMS={themeAnimationMap[theme]}
      isOpen={isOpen}
      onRequestClose={handleOverlayClick}
      shouldCloseOnOverlayClick={overlayClosing}
      contentLabel="Modal"
    >
      {hasCloseButton && (<button type="button" className="Modal__close" onClick={handleCloseClick}>&times;</button>)}
      <div className="Modal__in" style={{ width }}>{isFunction(children) ? children() : children}</div>
    </ReactModal>
  );
};



Modal.propTypes = {
  width: PropTypes.number,
  theme: PropTypes.oneOf(Object.keys(themesMap)),
  hasCloseButton: PropTypes.bool,
  overlayClosing: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  handleOverlayClick: PropTypes.func,
  handleCloseClick: PropTypes.func,
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.func ])
};



Modal.defaultProps = {
  width: 500,
  theme: THEME.DEFAULT,
  overlayClosing: true,
  hasCloseButton: true
};



export default Modal;
