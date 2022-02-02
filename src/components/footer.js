import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userActions } from '../actions';

class _Footer extends React.Component {
  userStatus = () => {
    return (
      <div className="user-status-box">
      <h5> {this.props.user.username} </h5>
      <Link to='/login' onClick={this.props.logout}> Logout </Link>
    </div>
    )
  }

  render() {
    return (
      <div className="footer">
        <footer class="py-3 bg-dark fixed-bottom">
          <div class="container">
          <p class="m-0 text-end text-white">
              { this.props.loggedIn && this.userStatus() }
            </p>
            <p class="m-0 text-end text-white">
              <h5>🕑: {this.props.time} weeks left</h5>
            </p>
            <p class="m-0 text-end text-white">
              <h5>💰: £{this.props.money}</h5>
            </p>
          </div>
        </footer>
      </div>
    );
  }

}

function mapState(state) {
  const { login } = state;
  const { loggedIn, user } = login ; 
  return { loggedIn, user };
}

const actionCreators = {
  logout: userActions.logout
};

const Footer = connect(mapState, actionCreators)(_Footer);
export default Footer;