import React from 'react';
import "./analysis.css";

class Analysis extends React.Component {
    render() {
        return (
        <div className="analysis">
            <div className="molecule_list">
                Molecule list + button
            </div>
            <div className="comparison_graph">
                Dylan's graphs
            </div>
        </div>
        )
    }
}

export default Analysis;