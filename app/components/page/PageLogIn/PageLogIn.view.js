import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-composite-router';
import FractalField from 'react-fractal-field';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import injectSheet from 'react-jss';
import required from '../../../validate/required';
import maxLength from '../../../validate/max-length';
import { RESPONSE_STATE } from '../../../config/constants';
import email from '../../../validate/email';
import FieldInput, { SIZE as INPUT_SIZE } from '../../field/FieldInput';
import ErrorsListNotice from '../../ui/ErrorsListNotice';



const validateEmail = [ required(), maxLength(255), email() ];
const validatePassword = [ required(), maxLength(255) ];


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


const PageLogIn = ({ classes, submitting, handleSubmit, errorMessages }) => {
  return (
    <div className={classes.root}>
      <Paper rounded transitionEnabled className={classes.paper} zDepth={1}>
        <FractalField initialValue={{}} onSubmit={handleSubmit}>
          {({ triggerSubmit }) => (
            <div>
              <div className={classes.h1}>Tests</div>
              <div className={classes.inputWr}>
                <FractalField
                  name="email"
                  validate={validateEmail}
                >
                  {({ control, error, submitted }) => (
                    <FieldInput
                      {...control}
                      type="email"
                      name="email"
                      errorText={submitted ? error : ''}
                      placeholder="Email"
                      onEnterPress={triggerSubmit}
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
                      placeholder="Password"
                      onEnterPress={triggerSubmit}
                      size={INPUT_SIZE.LARGE}
                    />
                  )}
                </FractalField>
              </div>

              <ErrorsListNotice
                messages={errorMessages}
              />
              <div className={classes.btnZone}>
                {/*<FlatButton
                  className={classes.loginBtn}
                  onClick={triggerSubmit}
                  disabled={submitting}
                  containerElement={<Link state="register" />}
                >
                  Register
                </FlatButton>*/}

                <RaisedButton
                  primary
                  className={classes.submitBtn}
                  onClick={triggerSubmit}
                  disabled={submitting}
                  type="submit"
                >
                  Sign In
                </RaisedButton>
              </div>
            </div>
          )}
        </FractalField>
      </Paper>
    </div>
  );
};



PageLogIn.propTypes = {
  classes: PropTypes.object,
  login: PropTypes.shape({
    responseState: PropTypes.oneOf(Object.values(RESPONSE_STATE))
  }),
  handleSubmit: PropTypes.func, // from redux-form
  submitting: PropTypes.bool,
  errorMessages: PropTypes.arrayOf(PropTypes.string)
};



PageLogIn.defaultProps = {
};



export default injectSheet(styles)(PageLogIn);
