import React from "react";
// import "../assay.css";
import { connect } from "react-redux";

class SketcherMoleculeImage extends React.Component {
  constructor(props) {
    super(props);
  }

  // selectMolecule = () => {
    // this.props.dispatch(selectMolecule(this.props.mol_id));
  // };

  render() {
    console.log(this.props.saved_sketched_mols[this.props.mol_id].data.img_html)
    return (
      <div class="molecule">
        <img
          src={this.props.saved_sketched_mols[this.props.mol_id].data.img_html}
          alt="drug"
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    saved_sketched_mols: state.saved_sketched_mols
  };
}

export default connect(mapStateToProps)(SketcherMoleculeImage);
