import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-composite-router';
import memoize from 'lodash/memoize';
import FractalField from 'react-fractal-field';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import injectSheet from 'react-jss';
import required from '../../../validate/required';
import maxLength from '../../../validate/max-length';
import email from '../../../validate/email';
import { RESPONSE_STATE } from '../../../config/constants';
import FieldInput, { SIZE as INPUT_SIZE } from '../../field/FieldInput';
import ErrorsListNotice from '../../ui/ErrorsListNotice';



const validateEmail = [ required(), maxLength(255), email() ];
const validatePassword = [ required(), maxLength(255) ];
const validateNickName = [ required(), maxLength(255) ];

const identical = memoize((ideal) => (value) => {
  if (ideal !== value) {
    return 'password is not identical';
  }
  return null;
});

const styles = () => ({
  root: {
    background: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    minHeight: '100%',
    padding: 20
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    width: '100%',
    maxWidth: 300
  },
  loginBtn: {
  },
  inputWr: {
    padding: '0 0 20px',
    width: 260
  },
  submitBtn: {
    float: 'right',
    color: 'white'
  },
  btnZone: {
    padding: '0'
  },
  h1: {
    fontSize: 21,
    lineHeight: 1,
    paddingBottom: 20
  }
});


const PageRegister = ({ classes, submitting, initialValue, handleSubmit, errorMessages }) => {
  return (
    <div className={classes.root}>
      <Paper rounded transitionEnabled className={classes.paper} zDepth={1}>
        <FractalField initialValue={initialValue} onSubmit={handleSubmit}>
          {({ triggerSubmit, value: formValue }) => (
            <div>
              <div className={classes.h1}>Tests</div>

              <div className={classes.inputWr}>
                <FractalField
                  name="username"
                  validate={validateNickName}
                >
                  {({ control, error, submitted }) => (
                    <FieldInput
                      {...control}
                      name="username"
                      errorText={submitted ? error : ''}
                      type="text"
                      onEnterPress={triggerSubmit}
                      placeholder="Nick Name"
                      size={INPUT_SIZE.LARGE}
                    />
                  )}
                </FractalField>
              </div>

              <div className={classes.inputWr}>
                <FractalField
                  name="email"
                  validate={validateEmail}
                >
                  {({ control, error, submitted }) => (
                    <FieldInput
                      {...control}
                      name="email"
                      errorText={submitted ? error : ''}
                      type="email"
                      onEnterPress={triggerSubmit}
                      placeholder="Email"
                      className="PageRegister__formInput"
                      size={INPUT_SIZE.LARGE}
                    />
                  )}
                </FractalField>
              </div>

              <div className={classes.inputWr}>
                <FractalField
                  name="password"
                  validate={validatePassword}
                >
                  {({ control, error, submitted }) => (
                    <FieldInput
                      {...control}
                      name="password"
                      errorText={submitted ? error : ''}
                      type="password"
                      onEnterPress={triggerSubmit}
                      placeholder="Password"
                      className="PageRegister__formInput"
                      size={INPUT_SIZE.LARGE}
                    />
                  )}
                </FractalField>
              </div>

              <div className={classes.inputWr}>
                <FractalField
                  name="confirm"
                  validate={[ required(), identical(formValue.password) ]}
                >
                  {({ control, error, submitted }) => (
                    <FieldInput
                      {...control}
                      name="confirm"
                      errorText={submitted ? error : ''}
                      type="password"
                      onEnterPress={triggerSubmit}
                      placeholder="Confirm Password"
                      className="PageRegister__formInput"
                      size={INPUT_SIZE.LARGE}
                    />
                  )}
                </FractalField>
              </div>

              <ErrorsListNotice
                className="PageRegister__formErrors"
                messages={errorMessages}
              />

              <div className={classes.btnZone}>
                <FlatButton
                  className={classes.loginBtn}
                  onClick={triggerSubmit}
                  disabled={submitting}
                  containerElement={<Link state="login" />}
                >
                  Log in
                </FlatButton>
                <RaisedButton
                  primary
                  className={classes.submitBtn}
                  onClick={triggerSubmit}
                  disabled={submitting}
                  type="submit"
                >
                  Register
                </RaisedButton>
              </div>
            </div>
          )}
        </FractalField>
      </Paper>
    </div>
  );
};



PageRegister.propTypes = {
  classes: PropTypes.object,
  initialValue: PropTypes.object,
  register: PropTypes.shape({
    responseState: PropTypes.oneOf(Object.values(RESPONSE_STATE))
  }),
  handleSubmit: PropTypes.func, // from redux-form
  submitting: PropTypes.bool,
  errorMessages: PropTypes.arrayOf(PropTypes.string)
};



PageRegister.defaultProps = {
};



export default injectSheet(styles)(PageRegister);
