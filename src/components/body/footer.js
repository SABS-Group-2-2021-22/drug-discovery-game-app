import React from "react";
import { connect } from "react-redux"
import { Link } from 'react-router-dom';

import { userActions } from '../../actions';

import './footer.css'

class Footer extends React.Component {

  userStatus = () => {
    return (
      <div className="user-status-box">
        <h5> {this.props.user.username} </h5>
        <Link className='navigation-link' to='/login' onClick={this.props.logout}> Log out </Link>
      </div>
    )
  }

  render() {
    console.log(this.props.time)
    console.log(this.props.money)
    console.log(this.props.time_and_money)
    console.log(this.props.loggedIn)
    return (
      <div className="footer">
        <div class="container">
          <div className="user-status">
            <p class="m-0 text-start text-white">
              {this.props.loggedIn && this.userStatus()}
            </p>
          </div>
          <div className="time-money-status">
            <p class="m-0 text-end text-white">
              <h5>🕑: {this.props.time} weeks left</h5>
            </p>
            <p class="m-0 text-end text-white">
              <h5>💰: £{this.props.money}</h5>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    const { login } = state;
    const { loggedIn, user, game } = login;
    let money = state.game.money;
    let time = state.game.time;
    return { loggedIn, user, time, money };
}

const actionCreators = {
  logout: userActions.logout
};

export default connect(mapStateToProps, actionCreators)(Footer)