import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./builder.css";
import RGroupList from "./r_group_list.js";
import MoleculeImage from "./molecule_display.js";
// import MoleculeList from "../assay/molecule_list.js";
import MoleculeList from "./molecule_list.js";
import ControlPanel from "./control_panel.js";
import { connect } from "react-redux";

class Builder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle_help: false,
    };
  }

  toggleHelp = (event) => {
    console.log(this.state.toggle_help)
    if (this.state.toggle_help) {
      this.setState({ toggle_help: false });
    }
    else {
      this.setState({ toggle_help: true });
    }
  };

  render() {
    return (
      <div className="wrapper">
        <div className="build">
          <div className="r-group-selection">
            <div className="r-group-a">
               R Group A
              <RGroupList r_group_pos={"A"} />
            </div>
            <div className='r-group-b'>
               R Group B
              <RGroupList r_group_pos={"B"} />
            </div>
            <div className="hover-info">
              <button onClick={this.toggleHelp}>
                ?
              </button>
              {this.state.toggle_help && (
                <div className="info-text">
                  <p>
                    <div>{this.props.help[0]}</div>
                    {"\n"}
                    <div>{this.props.help[1]}</div>
                    <div>{this.props.help[2]}</div>
                    <div>{this.props.help[3]}</div>
                    <div>{this.props.help[4]}</div>
                    <div>{this.props.help[5]}</div>
                    <div>{this.props.help[6]}</div>
                    <div>{this.props.help[7]}</div>
                    <div>{this.props.help[8]}</div>
                    {"\n"}
                    <div>{this.props.help[9]}</div>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="mol-visbox">
            <div className="rendered-molecule">
              <MoleculeImage />
            </div>
            <ControlPanel />
          </div>
          { Object.keys(this.props.saved_mols).length > 0 && 
          <div className="molecule-chooser-bar">
              <p>Your molecules:</p>
              <MoleculeList />
          </div>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    help: state.init.help.build,
    saved_mols: state.assay.saved_mols
  };
}

export default connect(mapStateToProps)(Builder);
