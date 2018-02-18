import { compose, setDisplayName } from 'recompose';
import ArticleView from './Article.view';



export default compose(
  setDisplayName('Article')
)(ArticleView);
