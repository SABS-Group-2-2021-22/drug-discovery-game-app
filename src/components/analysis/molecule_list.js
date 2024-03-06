import React from "react";
import "./analysis.css";
import MoleculeWidget from "./molecule_widget.js";
import { connect } from "react-redux";

class MoleculeList extends React.Component {
  constructor(props) {
    super(props);
    
    this.widgetRefs = Object.keys(this.props.saved_mols).reduce((acc, mol_id) => {
      acc[mol_id] = React.createRef();
      return acc;
    }, {});
  }

  componentDidUpdate(prevProps) {
    // Check if selected_mol has changed
    if (prevProps.selected_mol !== this.props.selected_mol) {
      // Scroll the selected molecule widget into view
      const selectedWidgetRef = this.widgetRefs[this.props.selected_mol];
      if (selectedWidgetRef && selectedWidgetRef.current) {
        selectedWidgetRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }

  render() {
    return (
      <div className="molecule-list">
        {Object.keys(this.props.saved_mols).map((mol_id) => (
          <div ref={this.widgetRefs[mol_id]} key={mol_id}>
            <MoleculeWidget
              mol_id={mol_id}
              selected_mol={this.props.selected_mol}
            />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  saved_mols: state.assay.saved_mols,
  selected_mol: state.selector.selected_mol,
});

export default connect(mapStateToProps)(MoleculeList);