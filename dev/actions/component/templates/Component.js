import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';<% if (features.store) {%>
import { connect } from 'react-redux-self';<% } %><% if (features.form) {%>
import formHoc from '<%= _relPath("app/components/hoc/form") %>';<% } %><% if (features.store) {%>
import reducer from './<%= name %>.store';<% } %>
import <%= name %>View from './<%= name %>.view';



export default compose(
  setDisplayName('<%= name %>'),<% if (features.store) {%>
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
  }),<% } %>
)(<%= name %>View);
