import React from "react";
import "./analysis.css";
import MoleculeImage from "./molecule_image.js";
import MoleculeStats from "./molecule_stats.js";
import { selectorActions } from "../../actions";
import { connect } from "react-redux"

class MoleculeWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  // fires the selectMolecule action when clicking the molecule's image
  selectMolecule = () => {
    this.props.selectMolecule(this.props.mol_id);
  };

  render() {
    const selected_mol_style = {
      borderWidth:  (this.props.selected_mol == this.props.mol_id ? "8px" : "1px")
    };
    return (
      <div className="molecule-container">
        <div className="molecule-widget" 
          style={selected_mol_style}
          onClick={this.selectMolecule}
        >
          <MoleculeImage mol_id={this.props.mol_id} />
          {this.props.mol_id}
          <MoleculeStats mol_id={this.props.mol_id} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected_mol: state.selector.selected_mol
  };
}

const actionCreators = {
  selectMolecule: selectorActions.selectMolecule,
};

export default connect(mapStateToProps, actionCreators)(MoleculeWidget);