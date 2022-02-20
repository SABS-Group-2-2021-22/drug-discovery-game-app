import React from "react";
import "../assay.css";
import { connect } from "react-redux";

class Filters extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div class="container" className="filter-stats">
                <div class="row" className="stats-type-header"> Lipinski Filters: </div>
                <div class="row">
                    MW: {this.props.filters.MW ? 'Pass' : 'Fail'}
                </div>
                <div class="row">
                    H Acc.: {this.props.filters.h_acc ? 'Pass' : 'Fail'}
                </div>
                <div class="row">
                    H Don.: {this.props.filters.h_don ? 'Pass' : 'Fail'}
                </div>
                <div class="row">
                    logP: {this.props.filters.logP ? 'Pass' : 'Fail'}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    selected_mol: state.selected_mol,
    filters: state.saved_mols[state.selected_mol].data.filters
  };
}

export default connect(mapStateToProps)(Filters)