import React from 'react';
import PropTypes from 'prop-types';
import './SandboxComponentPropsForm.less';
import { Field } from 'redux-form';



const renderField = ({ input, label, type, meta: { error } }) => ( // eslint-disable-line react/prop-types
  <div>
    <textarea {...input} rows={String(input.value).split('\n').length + 2} className="SandboxComponentPropsForm__textarea" placeholder={label} type={type} />
    {error && <span className="SandboxComponentPropsForm__fieldError">{error}</span>}
  </div>
);


const SandboxComponentPropsForm = ({ handleSubmit, error, pristine, submitting }) => (
  <form onSubmit={handleSubmit} className="SandboxComponentPropsForm">
    <Field
      name="props"
      label="Props"
      component={renderField}
    />
    {error}
    <button type="submit" disabled={pristine || submitting} className="SandboxComponentPropsForm__submit">Submit</button>
  </form>
);



SandboxComponentPropsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.any,
  pristine: PropTypes.bool.isRequired
};



SandboxComponentPropsForm.defaultProps = {
};



export default SandboxComponentPropsForm;
