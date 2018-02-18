import { compose, setDisplayName } from 'recompose';
import { connect } from 'react-redux-self';
import reducer from './PageDashboard.store';
import PageDashboardView from './PageDashboard.view';



export default compose(
  setDisplayName('PageDashboard'),
  connect({
    reducer,
    getters: [
      (ownStoreState) => ownStoreState
    ],
    selector: (ownStoreState) => ({
      ...ownStoreState
    }),
    denormalize: null,
    mapDispatchToProps: null
  }),
)(PageDashboardView);
