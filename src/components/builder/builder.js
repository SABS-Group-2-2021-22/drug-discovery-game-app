import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./builder.css";
import RGroupList from "./r_group_list.js";
import MoleculeImage from "./molecule_display.js";
import ControlPanel from "./control_panel.js";
import { connect } from "react-redux";

class Builder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info_requested: false,
    };
  }

  toggleInfo = (event) => {
    const currentState = this.state.info_requested;
    if (!currentState) {
      console.log(this.props.help);
    }
    this.setState({ info_requested: !currentState });
  };

  render = () => {
    return (
      <div className="wrapper">
        <div className="build">
          <div className="r-group-selection">
            <RGroupList r_group_pos={"A"} />
            <RGroupList r_group_pos={"B"} />
            <div className="hover-info">
              <button onClick={this.toggleInfo}>
                ?
              </button>
              {this.state.info_requested && (
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
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    help: state.init.help.build,
  };
}

export default connect(mapStateToProps)(Builder);
