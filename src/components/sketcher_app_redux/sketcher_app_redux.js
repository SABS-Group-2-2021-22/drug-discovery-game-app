import React from "react";
import { connect} from "react-redux";
import SketchedMoleculeList from "./sketched_molecule_list";
import Sketcher from "./sketcher"
import { saveSketchedMolecule} from "../../actions";
import "./sketcher_app.css"

class SketcherAppRedux extends React.Component {
    constructor(props) {
        super(props);
        this.saveSketchedMoleculeParent = this.saveSketchedMoleculeParent.bind(this);
    }

    saveSketchedMoleculeParent(input) {
        this.props.dispatch(saveSketchedMolecule(input))
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
                </div>
        )
    }
}

export default connect( ) (SketcherAppRedux)