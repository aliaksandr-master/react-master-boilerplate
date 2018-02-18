<% if (features.theme) {%>import uSymbol from 'usymbol';
import constant from '<%= _relPath("app/lib/const") %>';



export const THEME = constant('<%= name %>(THEME)', {
  DEFAULT: uSymbol('themeDefault', '<%= name %>')
});

export const SIZE = constant('<%= name %>:SIZE', {
  DEFAULT: uSymbol('sizeDefault', '<%= name %>')
});<%}%>
