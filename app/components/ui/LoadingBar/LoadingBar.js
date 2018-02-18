import { connect } from 'react-redux-self';
import isNil from 'lodash/isNil';
import isEmpty from 'lodash/isEmpty';
import { compose, withPropsOnChange } from 'recompose';
import LoadingBarComponent from './LoadingBar.view';
import { cleanLoadingErrorActionCreator } from './LoadingBar.store';



export default compose(
  connect({
    getters: [
      (_1, { loading: { active } }) => active,
      (_1, { loading: { error } }) => error
    ],
    selector: (active, error) => ({
      active,
      error
    }),
    mapDispatchToProps: {
      cleanLoadingErrorAction: cleanLoadingErrorActionCreator
    }
  }),
  withPropsOnChange([ 'error' ], ({ error, cleanLoadingErrorAction }) => {
    if (!isNil(error) && !isEmpty(error)) {
      // TODO: show message
      cleanLoadingErrorAction();
    }
  })
)(LoadingBarComponent);
