import { compose, setDisplayName, mapProps, defaultProps } from 'recompose';
import omit from 'lodash/omit';
import getStaticUrl from '../../../lib/calc-static-url';
import ImageView from './Image.view';



export default compose(
  setDisplayName('Image'),
  defaultProps({
    'static': false
  }),
  mapProps((props) => {
    const isStatic = props['static']; // eslint-disable-line dot-notation

    props = omit(props, 'static');
    props.src = isStatic ? getStaticUrl(props.src) : props.src;

    return props;
  })
)(ImageView);
