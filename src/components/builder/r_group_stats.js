import React from "react";
import "./builder.css"


class RGroupStats extends React.Component {
    render() {
        return (
            <div class="container" className="r_group_stats" onClick={this.props.func}>
                <div className="row">
                    <div className="col">
                        MW: {Number(this.props.stats.MW).toFixed(1)}  Da
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        LogP: {Number(this.props.stats.logP).toFixed(2)}
                    </div>
                    <div className="col">
                        TPSA: {Number(this.props.stats.TPSA).toFixed(2)} {"Å\u00b2"}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        HA: {this.props.stats.HA}
                    </div>
                    <div className="col">
                        H Acc.: {this.props.stats.h_acc}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        H Don.: {this.props.stats.h_don}
                    </div>
                    <div className="col">
                        Rings: {this.props.stats.rings}
                    </div>
                </div>
            </div>
        )
    }

}

export default RGroupStats;