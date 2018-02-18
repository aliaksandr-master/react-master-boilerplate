import React from 'react';
import PropTypes from 'prop-types';
import './Image.view.less';
import classnames from '../../../vendor/classnames';
import { RADIUS } from './Image.const';



const roundedMap = {
  [RADIUS.ICON]: 'Image--radiusIcon',
  [RADIUS.CIRCLE]: 'Image--radiusCircle'
};



const Image = ({ src, ratio, radius, className, ...otherProps }) => {
  return (
    <div className={classnames('Image', className, roundedMap[radius], !ratio && 'Image--freeTransform')} {...otherProps}>
      <div className="Image__in" style={{ paddingBottom: `${(ratio || 0) * 100}%` }}>
        <img className="Image__img" src={src} />
      </div>
    </div>
  );
};



Image.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  ratio: PropTypes.number,
  radius: PropTypes.oneOf(Object.values(RADIUS))
};



Image.defaultProps = {
};



export default Image;
