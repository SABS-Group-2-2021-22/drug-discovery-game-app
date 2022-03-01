import React from "react";
import { Link } from "react-router-dom";
import '../app.css';

class SketcherControlPanel extends React.Component {
  constructor(props) {
    super(props);
}


render() {
    return (
              <div className="sketcher-control-panel">
                <button>Clear</button>
                <button onClick={this.props.triggerSaving }>Save</button>
                <Link to="./../assay">
                  <button>Assay</button>
                </Link>
              </div>
            )
        }
      }

export default SketcherControlPanel