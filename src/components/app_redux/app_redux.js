import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../app.css";
import RGroupList from "./r_group_list.js"
import { connect } from "react-redux";

class AppRedux extends React.Component {
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
            </div>
          </div>
        );
    }
}

export default connect(null)(AppRedux)
