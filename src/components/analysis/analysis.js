import React from "react";
import "./analysis.css";
import SelectorPanel from "./selector_panel.js";
import MoleculeList from "./molecule_list.js";
import ThePlot from "./the_plot.js";
import AssayDataTable from "./AssayDataTable.js";
import { connect } from "react-redux";
import { initActions } from "../../actions";
import { Link } from "react-router-dom";

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTable: true, // Initial state to show the table
    };
  }

  // Retrieves Roche's target compound from the BE for reduced lag
  // ...on the results page
  componentDidMount() {
    this.props.fetchRoche();
  }

  // Toggle function to show/hide the assay table
  toggleTableVisibility = () => {
    this.setState(prevState => ({
      showTable: !prevState.showTable
    }));
  };

  render() {
    return (
      <div className="wrapper">
        {this.props.saved_or_not ? (
          <div className="analysis">
            <div className="final-molecule-bar">
              <SelectorPanel />
              <MoleculeList />
            </div>
            <div className="assay-data-table">
              {this.state.showTable && <AssayDataTable />}
            </div>
            <div className="toggle-table-button">
              <button onClick={this.toggleTableVisibility}>
                {this.state.showTable ? 'Hide Assay Table' : 'Show Assay Table'}
              </button>
            </div>
            <div className="nav-buttons">
              <Link to="/assay">
                <button>{'← Test'}</button>
              </Link>
            </div>
          </div>
        ) : (
          <div className='unsavedmol'>       
            <Link to="/Loadingpage">
              <button className="mk_pre_test_button">Go back to design your molecules first!</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {saved_or_not: state.assay.saved_or_not};
}

const actionCreators = {
  fetchRoche: initActions.fetchRoche,
};

export default connect(mapStateToProps, actionCreators)(Analysis);
