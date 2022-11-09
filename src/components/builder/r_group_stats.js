import React from "react";
import "./builder.css"


class RGroupStats extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="container" className="r_group_stats" onClick={this.props.func}>
                <div class="row">
                    <div class="col">
                        MW: {Number(this.props.stats.MW).toFixed(1)}  Da
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        logP: {Number(this.props.stats.logP).toFixed(2)}
                    </div>
                    <div class="col">
                        TPSA: {Number(this.props.stats.TPSA).toFixed(2)} {"Å\u00b2"}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        HA: {this.props.stats.HA}
                    </div>
                    <div class="col">
                        H Acc.: {this.props.stats.h_acc}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        H Don.: {this.props.stats.h_don}
                    </div>
                    <div class="col">
                        Rings: {this.props.stats.rings}
                    </div>
                </div>
            </div>
        )
    }

}

export default RGroupStats;