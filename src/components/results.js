import React from 'react';
import "./results.css";

class Results extends React.Component {
    render() {
        return (
        <div className ="results">
            <div className = "real_molecule">
                Roche's Molecule
            </div>
            <div className = "chosen_molecule">
                Final Molecule
            </div>
            <div className = "spider_plot">
                Spider Plot
            </div>
            <div className = "explanation_results">
                Explanation of what went right/wrong
            </div>
        </div>
        )
    }
}

export default Results;