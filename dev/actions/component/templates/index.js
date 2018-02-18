import <%= name %> from './<%= name %>';<% if (features.theme) {%>
import { THEME, SIZE } from './<%= name %>.const';



export { THEME, SIZE };<% } %>



export default <%= name %>;
