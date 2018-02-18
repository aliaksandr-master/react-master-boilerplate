import el from 'dom-tricks/el';
import append from 'dom-tricks/append';
import './index.less';



const div = el('div', { id: 'react-root' });

append(document.body, div);


export default div;
