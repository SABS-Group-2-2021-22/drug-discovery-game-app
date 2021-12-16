import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time_money: [0, 0] };
    this.updateTimeandMoney = this.updateTimeandMoney.bind(this);
  }
  updateTimeandMoney() {
    const base_url = 'https://drug-discovery-game-backend.herokuapp.com/update_time_money'
    fetch(base_url)
      .then((response) => response.json())
      .then(time_and_money => {
        this.setState({ time_money: time_and_money })
      })
      .catch(err => {
        throw Error(err.message);
      });
  }
  render() {
    return (
      <div className="footer">
        <footer class="py-3 bg-dark fixed-bottom">
          <div class="container">
            <p class="m-0 text-end text-white">
              <h5>🕑: {this.state.time_money[1]} weeks left</h5>
            </p>
            <p class="m-0 text-end text-white">
              <h5>💰: £{this.state.time_money[0]}</h5>
            </p>
            {/* <button label="Update Time" onClick={() => this.updateTimeandMoney()}></button>
            <div>{this.state.time_money[0]}</div> */}
          </div>
        </footer>
      </div>
    );
  }

}

export default Footer;