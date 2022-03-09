import React from "react";
import "../results.css";
import { connect } from "react-redux";
import SketcherMoleculeImage from "./sketcher_molecule_image.js";
import SketcherAssays from "./sketcher_assay_display.js"
import SketcherSpiderPlot from "./sketcher_spider_plot.js"
import SketcherComparisonText from "./sketcher_comparison_text.js"
import { Link } from "react-router-dom";


class SketcherResultsRedux extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        if (!this.props.spider_data.data || !this.props.comp_text.data) {
            return <div />
        }
        return (
          <div className="wrapper">
            <div className="results">
              <div className="molecule-choices">
                <div className="real-molecule">
                  <div className="title">Molecule with desired profile</div>
                  <div className="molecule-image-and-descriptors">
                    <div className="molecule-image">
                      <figure>
                        <div className="display_molecule_bar">
                          <SketcherMoleculeImage mol_id={"Roche"} />
                        </div>
                      </figure>
                    </div>
                    <div class="container" className="molecule-descriptors">
                      <SketcherAssays mol_id={"Roche"} />
                    </div>
                  </div>
                </div>
                <div className="chosen-molecule">
                  <div className="title">Your Molecule</div>
                  <div className="molecule-image-and-descriptors">
                    <div className="molecule-image">
                      <figure>
                        <div className="display_molecule_bar">
                          <SketcherMoleculeImage mol_id={this.props.chosen_mol} />
                        </div>
                      </figure>
                    </div>
                    <div class="container" className="molecule-descriptors">
                      {/* <SketcherAssays mol_id={this.props.chosen_mol} /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="plot-and-explanation">
                <div className="spider-plot">
                  {/* <SketcherSpiderPlot /> */}
                </div>
                <div className='explanation-and-button'>
                  {/* <SketcherComparisonText /> */}
                  <Link to="/">
                    <button> End Game </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        spider_data: state.spider_data,
        comp_text: state.comp_text,
        chosen_mol: state.chosen_mol,
    };
}

export default connect(mapStateToProps)(SketcherResultsRedux)