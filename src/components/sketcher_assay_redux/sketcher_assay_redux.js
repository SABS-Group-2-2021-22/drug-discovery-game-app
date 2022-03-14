import React from 'react';
import "./../assay/assay.css";
import { connect } from "react-redux";
import SketcherMoleculeList  from "./sketcher_molecule_list.js";
import SketcherMoleculeImage from "./sketcher_molecule_image.js";
import SketcherAssayPanel from "./sketcher_assay_panel.js";
import SketcherMoleculeStats from "./sketcher_molecule_stats.js";
import SketcherControlPanel from "./sketcher_control_panel.js"

class SketcherAssayRedux extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="assay">
          <div className="molecule-chooser_bar">
            <SketcherMoleculeList />
          </div>
            <SketcherAssayPanel />
          <div className="display_molecule_bar">
            <SketcherMoleculeImage mol_id={this.props.selected_mol} />
            <div className='selected-mol-stats'>
              <SketcherMoleculeStats selected_mol={this.props.selected_mol}/>
            </div>
            <SketcherControlPanel />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected_mol: state.sketcher.selected_mol,
  };
}

export default connect(mapStateToProps)(SketcherAssayRedux)
