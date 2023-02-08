import React from "react";
import "./assay.css";
import MoleculeWidget from "./molecule_widget.js"
import { connect } from "react-redux";

class MoleculeList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="molecule-list">
        {Array.from(
          { length: Object.keys(this.props.saved_mols).length },
          (_, i) => (
            <MoleculeWidget
              key={Object.keys(this.props.saved_mols)[i]}
              mol_id={Object.keys(this.props.saved_mols)[i]}
              selected_mol={this.props.selected_mol}
            />
          )
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        saved_mols: state.assay.saved_mols,
        selected_mol: state.selector.selected_mol
    }
}

export default connect(mapStateToProps)(MoleculeList)