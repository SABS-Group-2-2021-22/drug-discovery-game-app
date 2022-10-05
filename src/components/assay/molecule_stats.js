import React from "react";
import "./assay.css";
import { connect } from "react-redux";
import Lipinski from "./lipinski_display.js";
import Descriptors from "./descriptor_display.js";
import Assays from "./assay_display.js";

class MoleculeStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: [],
    };
  }

  onHover = (label) => {
    this.setState({ hover: label });
    console.log(this.state.hover);
  };

  onUnHover = () => {
    this.setState({ hover: [] });
    console.log(this.state.hover);
  };

  render() {
    return (
      <div className="mol-stats">
        {this.props.lipinski_run && (
          <Lipinski mol_id={this.props.selected_mol} hover={this.state.hover} />
        )}
        <div className="hover-info-button-lip">
          {this.props.toggle_help && this.props.lipinski_run && (
            <button
              className="hover-info-button-lip"
              onMouseEnter={() => {
                this.onHover("lip");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
            >
              ?
            </button>
          )}
        </div>
        {this.props.descriptors_run && (
          <Descriptors
            mol_id={this.props.selected_mol}
            hover={this.state.hover}
          />
        )}
        {this.props.drug_props_run && (
          <Assays mol_id={this.props.selected_mol} hover={this.state.hover} />
        )}
        <div className="hover-info-button-assay">
          {this.props.toggle_help && this.props.drug_props_run && (
            <button
              className="hover-info-button-assay"
              onMouseEnter={() => {
                this.onHover("assay");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
            >
              ?
            </button>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected_mol: state.selector.selected_mol,
    lipinski_run:
      state.assay.saved_mols[state.selector.selected_mol].data.assays_run
        .lipinski,
    descriptors_run:
      state.assay.saved_mols[state.selector.selected_mol].data.assays_run
        .descriptors,
    drug_props_run:
      state.assay.saved_mols[state.selector.selected_mol].data.assays_run
        .drug_props,
    toggle_help: state.assay.toggle_help,
  };
}

export default connect(mapStateToProps)(MoleculeStats);
