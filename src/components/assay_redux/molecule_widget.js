import react from "react";
import "../assay.css"
import { connect } from "react-redux"
import { MoleculeImage } from "./molecule_display"

class MoleculeWidget extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="molecule-container">
                <div className="molecule-widget">
                    <MoleculeImage molecule={this.props.molecule}/>
                </div>
            </div>
        )
    }





}
