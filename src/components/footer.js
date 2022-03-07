import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <footer className="py-3 bg-dark fixed-bottom">
          <div className="container">
            <div className="m-0 text-end text-white">
              <h5>🕑: {this.props.time} weeks left</h5>
            </div>
            <div className="m-0 text-end text-white">
              <h5>💰: £{this.props.money}</h5>
            </div>
          </div>
        </footer>
      </div>
    );
  }

}

export default Footer;