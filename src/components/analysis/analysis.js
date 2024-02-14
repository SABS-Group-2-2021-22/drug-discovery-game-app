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
      showComponent: 'table', // Initial state to show the table
    };
  }

  componentDidMount() {
    this.props.fetchRoche();
  }

  toggleComponentVisibility = () => {
    this.setState(prevState => ({
      showComponent: prevState.showComponent === 'table' ? 'plot' : 'table'
    }));
  };

  render() {
    return (
      <div className="wrapper">
        {this.props.saved_or_not ? (
          <div className="analysis">
            <div className="nav-buttons">
              
              <div className="toggle-component-button">
                <button onClick={this.toggleComponentVisibility}>
                  {this.state.showComponent === 'table' ? 'Show Plot' : 'Show Assay Table'}
                </button>
              </div>
              <Link to="/assay">
                <button>{'← Test'}</button>
              </Link>
            </div>
            {this.state.showComponent === 'table' && (
              <div className="assay-data-table">
                <AssayDataTable />
              </div>
            )}
            {this.state.showComponent === 'plot' && <ThePlot />}
  
            <div className="final-molecule-bar">
              <SelectorPanel />
              <MoleculeList />
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
  return {
    saved_or_not: state.assay.saved_or_not,
  };
}

const actionCreators = {
  fetchRoche: initActions.fetchRoche,
};

export default connect(mapStateToProps, actionCreators)(Analysis);
