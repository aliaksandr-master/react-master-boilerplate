import React from 'react';
import PropTypes from 'prop-types';<% if (features.theme) {%>
import values from 'lodash/values';<% } %>
import Placeholder from '<%= _relPath("app/components/ui/Placeholder") %>';
import classnames from '<%= _relPath("app/vendor/classnames") %>';<% if (type.modal) {%>
import Modal from '<%= _relPath("app/components/modal/Modal") %>';<% } %><% if (features.theme) {%>
import { THEME, SIZE } from './<%= name %>.const';<% } %>
import './<%= name %>.view.less';



<% if (features.theme) {%>const themesMap = {
  [THEME.DEFAULT]: '<%= name %>--themeDefault'
};

const sizesMap = {
  [SIZE.DEFAULT]: '<%= name %>--sizeDefault'
};


<% } %>const <%= name %> = ({ <%= type.modal ? 'isOpen, onRequestClose, ' : '' %><% if (features.theme) {%>theme, size, <%}%>className }) => {
  <% if (type.modal) {%>return (
    <Modal
      className={classnames('<%= name %>', className<% if (features.theme) {%>, themesMap[theme], sizesMap[size]<%}%>)}
      width={600}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <Placeholder>&lt;<%= name %> /&gt;</Placeholder>
    </Modal>
  );<% } else { %>return (
    <div className={classnames('<%= name %>', className<% if (features.theme) {%>, themesMap[theme], sizesMap[size]<%}%>)}>
      <Placeholder>&lt;<%= name %> /&gt;</Placeholder>
    </div>
  );<% } %>
};



<%= name %>.propTypes = {
  className: PropTypes.string<% if (features.theme) {%>,
  size: PropTypes.oneOf(values(SIZE)),
  theme: PropTypes.oneOf(values(THEME))<%}%><% if (type.modal) {%>,
  isOpen: PropTypes.bool.isRequired
  onRequestClose: PropTypes.func<% } %>
};



<%= name %>.defaultProps = {<% if (features.theme) {%>
  size: SIZE.DEFAULT,
  theme: THEME.DEFAULT<% } %>
};



export default <%= name %>;
