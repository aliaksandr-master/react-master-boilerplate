import React from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import classnames from '../../../vendor/classnames';
import { THEME, SIZE } from './Article.const';
import './Article.view.less';



const themesMap = {
  [THEME.DEFAULT]: 'Article--themeDefault'
};

const sizesMap = {
  [SIZE.DEFAULT]: 'Article--sizeDefault'
};


const Article = ({ children, theme, size, className }) => {
  return (
    <article className={classnames('Article', className, themesMap[theme], sizesMap[size])}>
      {children}
    </article>
  );
};



Article.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(values(SIZE)),
  theme: PropTypes.oneOf(values(THEME)),
  children: PropTypes.node
};



Article.defaultProps = {
  size: SIZE.DEFAULT,
  theme: THEME.DEFAULT
};



export default Article;
