import React from "react";
import { connect } from 'react-redux';

class _Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <footer class="py-3 bg-dark fixed-bottom">
          <div class="container">
          <p class="m-0 text-end text-white">
              <h5> { this.props.loggedIn && this.props.user.username }</h5>
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

const Footer = connect(mapState)(_Footer);
export default Footer;