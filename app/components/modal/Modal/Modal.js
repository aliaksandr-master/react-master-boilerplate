import PropTypes from 'prop-types';
import { compose, withHandlers, setPropTypes } from 'recompose';
import Modal from './Modal.view';
import { REASON } from './Modal.const';



export default compose(
  setPropTypes({
    onRequestClose: PropTypes.func
  }),
  withHandlers({
    handleCloseClick: ({ onRequestClose }) => () => {
      if (onRequestClose) {
        onRequestClose(REASON.CLOSE_BTN);
      }
    },
    handleOverlayClick: ({ onRequestClose }) => (event) => {
      if (event.target === event.currentTarget && onRequestClose) {
        onRequestClose(REASON.OVERLAY);
      }
    }
  })
)(Modal);
