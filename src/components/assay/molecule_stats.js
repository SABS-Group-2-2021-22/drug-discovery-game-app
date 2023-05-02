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
      help_label: false,
    };
  }

  toggleHelp = (label) => {
    console.log(this.state.help_label)
    if (this.state.help_label !== label) {
      this.setState({ help_label: label });
    }
    else {
      this.setState({ help_label: false });
    }
  };

  render() {
    return (
      <div className="mol-stats">
        <Lipinski mol_id={this.props.selected_mol} help_label={this.state.help_label} />
        <div className="hover-info-button-lip">
          {this.props.toggle_help && (
            <button
              className="hover-info-button-lip"
              onClick={() => {
                this.toggleHelp("lip")
              }}
            >
              ?
            </button>
          )}
        </div>
        <Descriptors
          mol_id={this.props.selected_mol}
          help_label={this.state.help_label}
        />
        <div className="hover-info-button-desc">
          {this.props.toggle_help && (
            <button
              className="hover-info-button-desc"
              onClick={() => {
                this.toggleHelp("descr")
              }}
            >
              ?
            </button>
          )}
        </div>
        {this.props.drug_props_run && (
          <Assays mol_id={this.props.selected_mol} help_label={this.state.help_label} />
        )}
        <div className="hover-info-button-assay">
          {this.props.toggle_help && this.props.drug_props_run && (
            <button
              className="hover-info-button-assay"
              onClick={() => {
                this.toggleHelp("assay")
              }}
            >
              ?
            </button>
          )}
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
