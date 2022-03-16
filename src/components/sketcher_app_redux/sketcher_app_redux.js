import React from "react";
import { connect} from "react-redux";
import SketchedMoleculeList from "./sketched_molecule_list";
import SketcherPopUp from "./sketcher_pop_up";
import Sketcher from "./sketcher"
import { sketcherActions } from "../../actions";
import "./sketcher_app.css"

class SketcherAppRedux extends React.Component {
    constructor(props) {
        super(props);
        this.saveSketchedMoleculeParent = this.saveSketchedMoleculeParent.bind(this);
    }

    saveSketchedMoleculeParent(smiles, input) {
        this.props.dispatch(sketcherActions.saveSketchedMolecule(smiles, input, this.props.saved_mols))
    }

    render() {
        return (
                <div className="sketcher_builder">
                    <div className="sketched_molecules">
                        <SketchedMoleculeList/>
                    </div>
                    <div className="ketcher">
                        <Sketcher saveSketchedMoleculeChild = {this.saveSketchedMoleculeParent}/>
                    </div>
                    <div>
                    {(this.props.sketcher_error[this.props.sketcher_error.length - 1] === 1) && <SketcherPopUp/>}
                    </div>
                </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        saved_mols: state.assay.saved_mols,
        sketcher_error: state.sketcher.sketcher_error,
    };
  }
  


export default connect (mapStateToProps) (SketcherAppRedux)