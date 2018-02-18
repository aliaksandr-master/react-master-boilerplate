import isString from 'lodash/isString';
import { branch, renderComponent, defaultProps } from 'recompose';
import WaitingText, { THEME } from '../../ui/WaitingText';



const BlockWaitingText = defaultProps({ theme: THEME.BLOCK, height: 300 })(WaitingText);


export default (condition, Component = () => null) => {
  if (isString(condition)) {
    const propName = condition;

    condition = (props) => Boolean(props[propName]);
  }

  if (Component === true) {
    Component = BlockWaitingText;
  }

  return branch(
    condition,
    renderComponent(Component)
  );
};
