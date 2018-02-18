/* eslint-env browser, jest */
import React from 'react';
import { mapProps, compose } from 'recompose';
import renderer from 'react-test-renderer';
import instead from '../index';
import Test from '../../../test/Test';
import div from '../../../../lib/root/index';



const ComponentPos = compose(
  instead(() => true, () => <div />)
)(() => <noscript />);

const ComponentNeg = compose(
  instead(() => false, () => <div />)
)(() => <noscript />);

const ComponentDef = compose(
  instead('hello', () => <div />)
)(() => <noscript />);

describe('rendering', () => {
  it('should render something1', () => {
    const component = renderer.create(
      <Test>
        <ComponentPos />
      </Test>
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('should render something2', () => {
    const component = renderer.create(
      <Test>
        <ComponentNeg />
      </Test>
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('should render something3', () => {
    const component = renderer.create(
      <Test>
        <ComponentDef />
      </Test>
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
