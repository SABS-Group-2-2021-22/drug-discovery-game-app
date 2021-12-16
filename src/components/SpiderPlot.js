import React, { Component } from "react";
import Plot from "react-plotly.js";

class SpiderPlot extends Component {
    constructor(props) {
        super();
        this.state ={
            user_data: [],
            user_r: [],
            user_params: [],
            ref_data: [],
            ref_r: [],
            ref_params: [],
        };
        this.retrieveSpiderData();

    }

    retrieveSpiderData() {
        const endpoint = 'https://drug-discovery-game-backend.herokuapp.com/getspiderdata'
        fetch (endpoint)
            .then((response) => response.json())
            .then(response => {
                let param_arr = response.param_dict
                this.setState({ user_data: param_arr[0]}, () => {
                    console.log(this.state.user_data);
                this.setState({ ref_data: param_arr[1]}, () => {
                    console.log(this.state.ref_data);
                })
                })
            })
            .catch(err => {
                throw Error(err.message);
            });
    }

    restructureData() {
        for (const [key, value] of Object.entries(this.state.user_data)) {
           console.log(key)
           console.log(value)
            this.state.user_r.push(value)
            this.state.user_params.push(key)
        };
        for (const [key, value] of Object.entries(this.state.ref_data)) {
           console.log(key)
           console.log(value)
            this.state.ref_r.push(value)
            this.state.ref_params.push(key)
        };
    }

    addTraces() {
        this.restructureData();
        let data = [
            {
                type: 'scatterpolar',
                r: this.state.user_r,
                theta: this.state.user_params,
                fill: 'toself',
                name: 'Chosen Molecule'
            },
            {
                type: 'scatterpolar',
                r: this.state.ref_r,
                theta: this.state.ref_params,
                fill: 'toself',
                name: "Roche's Molecule"
            }
        ];
        console.log(data)
        return data
    }

    layout() {
        let layout = {
            polar: {
                radialaxis: {
                    visible: true,
                    range: [0, 8]
                }
            },
            showlegend: true
        };
        return layout
    }

render() {
    return (
        <div>
            <Plot
            data={this.addTraces()}
            layout={this.layout()}
            />
        </div>
    )
}

}

export default SpiderPlot