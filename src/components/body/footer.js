import React from "react";
import { connect } from "react-redux";

import { gameActions, userActions } from "../../actions";

import "./footer.css";

class Footer extends React.Component {
  compile_game_data = () => {

    let molecule_info = {}
    Object.keys(this.props.saved_mols).map(mol_key => {
      console.log(this.props.saved_mols[mol_key])
      console.log(this.props.saved_mols[mol_key].data.descriptors)
      return molecule_info[mol_key] = {
        "keys": [mol_key.slice(0, 3), mol_key.slice(3, 6)],
        "descriptors": this.props.saved_mols[mol_key].data.descriptors,
        "lipinski": this.props.saved,
        "assays_run": this.props.saved_mols[mol_key].data.assays_run,
        "date_created": this.props.saved_mols[mol_key].date_created
      }
    })

    let game_data = {
      "money": this.props.money,
      "time": this.props.time,
      "chosen_mol": [this.props.selected_mol.slice(0, 3), this.props.selected_mol.slice(3, 6)],
      "molecule_info": molecule_info
    }
    return game_data
  }

  save_and_logout = () => {
    let game_data = JSON.stringify(this.compile_game_data())
    this.props.saveGame(game_data)
    this.props.logout()
    this.props.resetGame();
  }

  userStatus = () => {
    return (
      <div className="user-status-box">
        <span style={{fontSize:'22px'}}>{this.props.user.username}</span>
        <br />
        <button onClick={this.props.save_and_logout}>Log out</button>
      </div>
    );
  };

  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="user-status">
            {this.props.loggedIn && <div className="m-0 text-start text-white">{this.userStatus()}</div>}
          </div>        
          <div className="time-money-status">
            <p className="m-0 text-end text-white">
              🕑: {this.props.time} weeks left
            </p>
            <p className="m-0 text-end text-white" style={{ marginBottom: '10px' }}>
              💰: £{this.props.money}
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
    user: state.login.user,
    saved_mols: state.assay.saved_mols,
    selected_mol: state.selector.selected_mol
  };
}

const actionCreators = {
  saveGame: gameActions.saveGame,
  resetGame: gameActions.resetGame,
  logout: userActions.logout,
};

export default connect(mapStateToProps, actionCreators)(Footer);

