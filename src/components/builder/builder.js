import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./builder.css";
import RGroupList from "./r_group_list.js"
import MoleculeImage from "./molecule_display.js";
import ControlPanel from "./control_panel.js"
import { connect } from "react-redux";


class Builder extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="wrapper">
            <div className="app">
              <div className="r-group-selection">
                <RGroupList r_group_pos={"A"}/>
                <RGroupList r_group_pos={"B"}/>
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

export default connect()(Builder)
