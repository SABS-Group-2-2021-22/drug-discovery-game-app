import React from 'react';
import "./results.css";
import SpiderPlot from "./SpiderPlot.js";

class Results extends React.Component {
    render() {
        return (
          <div className="results">
            <div className="real_molecule">Roche's Molecule</div>
            <div className="chosen_molecule">Final Molecule</div>
            <div className="spider_plot">
                <SpiderPlot />
            </div>
            <div className="explanation_results">
              Explanation of what went right/wrong
            </div>

          </div>
        );
    }
}

export default Results;