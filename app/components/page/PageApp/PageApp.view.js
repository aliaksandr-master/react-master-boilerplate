import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slot, Link, Redirect } from 'react-composite-router';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Home from '../../../images/fa/Home.svg';
import gravatar from '../../../lib/gravatar';
import './PageApp.view.less';
import classnames from '../../../vendor/classnames';



const SafeDiv = class SafeDiv extends Component {
  render () {
    const { children, ref, onClick } = this.props;

    return (
      <div onClick={onClick} ref={ref}>{children}</div>
    );
  }
};

SafeDiv.propTypes = {
  ref: PropTypes.any,
  onClick: PropTypes.func,
  children: PropTypes.node
};


const PageApp = ({ user }) => (
  <div className="PageApp">
    <AppBar
      iconElementLeft={
        <div>
          <IconButton
            style={{ verticalAlign: 'middle', color: 'white' }}
            containerElement={<Link state="app.game.dashboard" />}
          >
            <Home />
          </IconButton>

          {/*<FlatButton
            style={{ verticalAlign: 'middle', color: 'white' }}
            containerElement={<Link state="app.training.dashboard" />}
          >
            Trainings
          </FlatButton>*/}

          {/*<FlatButton
            style={{ verticalAlign: 'middle' }}
            containerElement={<Link state="app.explore.dashboard" />}
          >
            EXPLORE
          </FlatButton>*/}

          <FlatButton
            style={{ verticalAlign: 'middle', color: 'white' }}
            containerElement={<Link state="app.game.dashboard" />}
          >
            Play
          </FlatButton>

          <FlatButton
            style={{ verticalAlign: 'middle', color: 'white' }}
            containerElement={<Link state="app.player.dashboard" />}
          >
            Games
          </FlatButton>
        </div>
      }
      iconElementRight={
        <IconMenu
          style={{ marginTop: 5, marginRight: 20 }}
          iconButtonElement={
            <SafeDiv>
              <Avatar
                src={gravatar(user.email)}
                size={40}
              />
            </SafeDiv>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem linkButton containerElement={<Link state="logout" />} primaryText="Logout" />
        </IconMenu>
      }
    />
    <div className="PageApp__contentWr">
      <div className={classnames('PageApp__content')}>
        <div className="PageApp__body">
          <Slot name="appBody">
            <Redirect state="app.game.dashboard" />
          </Slot>
        </div>
      </div>
    </div>
  </div>
);



PageApp.propTypes = {
  user: PropTypes.object
};



PageApp.defaultProps = {
};



export default PageApp;
