import React from 'react';
import "./../assay.css";
import { connect } from "react-redux";
import  MoleculeList  from "./molecule_list.js";
import MoleculeImage from "./molecule_image.js";
import AssayPanel from "./assay_panel.js";
import MoleculeStats from "./molecule_stats.js";

class AssayRedux extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="assay">
          <div className="molecule-choose_bar">
            <MoleculeList />
          </div>
            <AssayPanel />
          <div className="display_molecule_bar">
            <MoleculeImage mol_id={this.props.selected_mol} />
            <div className='selected-mol-stats'>
              <MoleculeStats selected_mol={this.props.selected_mol}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected_mol: state.selected_mol,
  };
}

export default connect(mapStateToProps)(AssayRedux)
