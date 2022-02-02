import react from "react";
import "../assay.css";
import { connect } from "react-redux";

class MoleculeList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='molecule-list'>
                {Array.from({ length: this.props.saved_mols.length}, (_, i) => 
                    <MoleculeWidget
                        key={Object.keys(this.props.saved_mols[i])}
                        molecule = {this.props.saved_mols[i]}
                    />)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        saved_mols: state.saved_mols
    }
}

export default connect(mapStateToProps)(MoleculeList)