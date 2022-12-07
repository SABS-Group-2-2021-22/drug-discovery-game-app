import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import { userActions } from "../../actions";

import "./footer.css";

class Footer extends React.Component {

  logMeOut = () => {
    axios({
      method: "POST",
      url:"/logout",
    })
    .then((response) => {
       localStorage.token
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}

  userStatus = () => {
    return (
      <div className="user-status-box">
        <h5> {this.props.user.username} </h5>
        <Link
          className="navigation-link"
          to="/login"
          onClick={logMeOut} // {this.props.logout}
        >
          {" "}
          Log out{" "}
        </Link>
      </div>
    );
  };

  render() {
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
  return {
    time: state.game.time,
    money: state.game.money,
    subtotal: state.game.subtotal,
    loggedIn: state.login.loggedIn,
    user: state.login.user
  };
}

const actionCreators = {
  logout: userActions.logout,
};

export default connect(mapStateToProps, actionCreators)(Footer);

