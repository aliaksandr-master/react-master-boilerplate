import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
import SandboxComponentPropsForm from './SandboxComponentPropsForm.jsx';



export default compose(
  reduxForm()
)(SandboxComponentPropsForm);
