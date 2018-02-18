/*eslint-disable react/jsx-no-bind */
import React from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import { Slot, Link, Redirect } from 'react-composite-router';
import '../SandboxComponent';
import { RESPONSE_STATE } from './Sandbox.const';
import './Sandbox.less';



const Sandbox = ({ components, componentsResponseState }) => (
  <div className="Sandbox">
    <div className="Sandbox__menu">
      {components.map(({ name, id, dir }, index, array) => (
        <div key={id} className="Sandbox__menuItemWr">
          {!index || array[index - 1].dir.split('/').shift() !== dir.split('/').shift()
            ? (
              <div className="Sandbox__menuItemH">{dir.split('/').shift()}</div>
            ) : (
              null
            )
          }
          <Link
            className="Sandbox__menuItem"
            reload
            activeClass="Sandbox__menuItem--elementActive"
            state="sandbox.component"
            params={{ componentId: id, variation: 'default' }}
          >
            {dir.split('/').length > 2 ? <span><span className="Sandbox__menuItemParent">{dir.split('/').slice(1, -1).join(' / ')}</span>&nbsp;/&nbsp;</span> : ''}
            <span>{name}</span>
          </Link>
        </div>
      ))}
    </div>

    <Slot
      name="component"
      render={(SandboxComponent, { componentId, variation }) => (
        componentsResponseState === RESPONSE_STATE.PENDING
          ? (
            <span>Loading...</span>
          ) : (
            componentsResponseState === RESPONSE_STATE.FAILED
              ? (
                <div>Ooops something went wrong</div>
              ) : (
                <SandboxComponent
                  variation={variation}
                  component={components.find(({ id }) => id === componentId)}
                />
              )
          )
      )}
    >
      {componentsResponseState === RESPONSE_STATE.PENDING
        ? (
          <span>Loading...</span>
        ) : (
          components.length
            ? (
              <Redirect state="sandbox.component" params={{ componentId: components[0].id, variation: 'default' }} reload />
            ) : (
              <p>There no active components components</p>
            )
        )
      }
    </Slot>
  </div>
);



Sandbox.propTypes = {
  componentsResponseState: PropTypes.oneOf(values(RESPONSE_STATE)),
  components: PropTypes.array.isRequired
};



Sandbox.defaultProps = {
};



export default Sandbox;
