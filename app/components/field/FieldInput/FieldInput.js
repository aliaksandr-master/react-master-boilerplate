import PropTypes from 'prop-types';
import { compose, withHandlers, mapProps, setPropTypes, setDisplayName, withProps, withPropsOnChange } from 'recompose';
import isNaN from 'lodash/isNaN';
import FieldInput from './FieldInput.view';



export default compose(
  setDisplayName('FieldInput'),
  setPropTypes({
    value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    onClick: PropTypes.func,
    onKeyPress: PropTypes.func,
    onEnterPress: PropTypes.func,
    onEscapePress: PropTypes.func
  }),
  withProps(({ value }) => ({
    value: value == null || isNaN(value) ? '' : String(value)
  })),
  withPropsOnChange([], ({ id }) => ({
    id: id == null ? `f${Date.now()}` : id
  })),
  withHandlers({
    onClick: ({ onClick }) => (ev) => {
      ev.target.select();
      if (onClick) {
        onClick();
      }
    },
    onKeyPress: ({ onKeyPress, onEnterPress }) => (event) => {
      if (onEnterPress && String(event.key).toUpperCase() === 'ENTER') {
        onEnterPress(event);
        event.preventDefault();
        return;
      }

      if (onKeyPress) {
        onKeyPress(event);
      }
    },
    onKeyDown: ({ onKeyDown, onEscapePress }) => (event) => {
      if (onEscapePress && String(event.key).toUpperCase() === 'ESCAPE') {
        onEscapePress(event);
        event.preventDefault();
        return;
      }

      if (onKeyDown) {
        onKeyDown(event);
      }
    }
  }),
  mapProps(({ onEnterPress, onEscapePress, ...props }) => props)
)(FieldInput);
