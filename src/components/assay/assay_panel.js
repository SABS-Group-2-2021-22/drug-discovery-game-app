import React from "react";
import "./assay.css";
import { connect } from "react-redux";
import { assayActions, gameActions } from "../../actions";

class AssayPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_assays: [],
      assays_run: null,
      selected_mol: null,
      hover: [],
      
    };
  }

  // set selected_mol and its assays_run states to the first compound
  // ...in store on page load
  componentDidMount() {
    this.setState({
      selected_mol: this.props.selected_mol,
      assays_run: this.props.assays_run,
    });
  }

  removeselectedAssays = (assay) => {
    let arr = this.state.selected_assays;
    arr = arr.filter(function (item) {
      return item !== assay;
    });
    this.setState({ selected_assays: arr });
  };

  // update the total time left in the store
  updateTime = (time_cost) => {
    this.props.updateTime(time_cost, this.props.time);
  };

  //update the total money left in the store
  updateMoney = (cost) => {
    this.props.updateMoney(cost, this.props.money);
  };



  runAssays = () => {
    const ASSAY_PRICES = {
      pIC50: 70.0,
      clearance_mouse: 7000.0,
      clearance_human: 9000.0,
      logd: 1000.0,
      pampa: 700.0,
    };
    const ASSAY_TIMES = {
      pIC50: 1.0,
      clearance_mouse: 3.0,
      clearance_human: 3.5,
      logd: 1.5,
      pampa: 1.0,
    };

    // iterate through all saved molecules at once
    let max_time = 0.
    let total_cost = 0.

    let alert = false;

    for ( var molecule_key in this.props.all_molecules_assay_data ) {

      let assays_run = this.props.all_molecules_assay_data[molecule_key].data.assays_run ;
      let toggle_assay_dict = this.props.all_molecules_assay_data[molecule_key].data.toggle_assay;

      // iterate through toggle_assay, if assay_value is true, add to selected assay
      let arr = []
      for (var key in toggle_assay_dict){
        if (toggle_assay_dict[key]) {
          arr.push(key)
        }
      }
      let selected_assays = arr;

      // iterate through selected assays and ensure that they do not exceed cost/time limits
      let cost_sum = 0;
      let time_sum = 0;
      for (var i = 0; i < selected_assays.length; i++) {
        if (!["drug_props", "lipinski", "descriptors"].includes(selected_assays[i]) && !assays_run[selected_assays[i]]) {
          cost_sum += ASSAY_PRICES[selected_assays[i]];
          time_sum += ASSAY_TIMES[selected_assays[i]];
        }
      }

      if (this.props.money - cost_sum < 0 || this.props.time - time_sum < 0) {
        for (var i = 0; i < selected_assays.length; i++) {
          this.removeselectedAssays(selected_assays[i]);
        }
        alert = true;
      }
      else {
        for (var i = 0; i < selected_assays.length; i++) {
          if (!["drug_props", "lipinski", "descriptors"].includes(selected_assays[i])) {
            if (!assays_run[selected_assays[i]]){
              assays_run[selected_assays[i]] = true;
              if (max_time < ASSAY_TIMES[selected_assays[i]]) {
                max_time = ASSAY_TIMES[selected_assays[i]] ;
              }
              total_cost = total_cost + ASSAY_PRICES[selected_assays[i]] ;
            }
          }
      }
      assays_run["drug_props"] = true;
      this.props.runAssay(molecule_key, assays_run);

      }
    }
    if (alert) {
      window.alert("Your choice of assays exceeds the cost and time limits! Please unselect some assays or proceed to Analysis")
      alert = false;
    }
    this.updateTime(max_time);
    this.updateMoney(total_cost);

  };

  runDescriptorsOrLipinski = () => {
    let assays_run = this.state.assays_run;
    let selected_assays = this.state.selected_assays;
    for (var i = 0; i < selected_assays.length; i++) {
      if (["lipinski", "descriptors"].includes(selected_assays[i])) {
        assays_run[selected_assays[i]] = true;
      }
    }
    this.props.runAssay(this.props.selected_mol, assays_run);
  };

  // select the assay
  onClick = (label) => {
    let arr = this.state.selected_assays;
    if (arr.includes(label) == false) {
      arr.push(label);
    }
    this.setState({ selected_assays: arr });
  };

  resetSelection = () => {
    this.setState({
      selected_assays: [],
      assays_run: this.props.assays_run,
      selected_mol: this.props.selected_mol,
    });
  };

  // update selections and cost on a state change
  componentDidUpdate() {
    if (this.state.selected_mol !== this.props.selected_mol) {
      this.resetSelection();
    }
  }

  onHover = (label) => {
    this.setState({ hover: label });
  };

  onUnHover = () => {
    this.setState({ hover: [] });
  };

  toggleAssay = (assay_type) => {
    if (this.props.toggle_assay[assay_type]) {
      this.props.toggleAssay(this.props.selected_mol,assay_type,false);
    } else {
      this.props.toggleAssay(this.props.selected_mol,assay_type,true);
    }
  }
// or this.props.toggle_assay.button
  render() {
    return(
      <div className="assay-panel">
        {this.props.toggle_assay.pIC50 && (
          <div className="activebutton">
            <button onClick={() => {
              this.toggleAssay("pIC50");
              this.onClick("pIC50");
              }}
              onMouseEnter={() => {
                this.onHover("pic50");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">pIC50</div>
              <div className="assay-cost-and-time">
                <p>
                  {""}
                  Cost £70
                  {"\n"}Duration: 1 week
                </p>
              </div>
            </button></div>
        )}
        {this.props.toggle_assay.pIC50 == false && (
          <div className="inactivebutton">
            <button onClick={() => {
              this.toggleAssay("pIC50");
              this.onClick("pIC50");
              }}
              onMouseEnter={() => {
                this.onHover("pic50");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">pIC50</div>
              <div className="assay-cost-and-time">
                <p>
                  {" "}
                  Cost £70
                  {"\n"}Duration: 1 week
                </p></div></button></div>
        )}
        {this.state.hover == "pic50" && this.props.toggle_help && (
        <div className="hover-info-text-pic50">
          <p>
            <div>{this.props.help[0]}</div>
          </p>
        </div>
        )}
        
        {this.props.toggle_assay.clearance_mouse && (
          <div className="activebutton">
            <button onClick={() => {
              this.toggleAssay("clearance_mouse");
              this.onClick("clearance_mouse");
              }}
              onMouseEnter={() => {
                this.onHover("clrmouse");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">Mouse Clearance</div>
              <div className="assay-cost-and-time">
                <p>
                  {" "}
                  Cost £7,000
                  {"\n"}Duration: 3 weeks
                </p></div>
              </button>
          </div>
        )}
        {this.props.toggle_assay.clearance_mouse == false && (
          <div className="inactivebutton">
            <button onClick={() => {
              this.toggleAssay("clearance_mouse");
              this.onClick("clearance_mouse");
              }}
              onMouseEnter={() => {
                this.onHover("clrmouse");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">Mouse Clearance</div>
              <div className="assay-cost-and-time">
                <p>
                  {" "}
                  Cost £7,000
                  {"\n"}Duration: 3 weeks
                </p>
              </div>
              </button>
          </div>
        )}
        {this.state.hover == "clrmouse" && this.props.toggle_help && (
        <div className="hover-info-text-clrmouse">
          <p>
            <div>{this.props.help[1]}</div>
          </p>
        </div>
        )}

        {this.props.toggle_assay.clearance_human && (
          <div className="activebutton">
            <button onClick={() => {
              this.toggleAssay("clearance_human");
              this.onClick("clearance_human");
              }}
              onMouseEnter={() => {
                this.onHover("clrhuman");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">Human Clearance</div>
              <div className="assay-cost-and-time">
                <p>
                {" "}
                Cost £9,000
                {"\n"}Duration: 3.5 weeks
                </p>
              </div>
              </button>
          </div>
        )}
        {this.props.toggle_assay.clearance_human == false && (
          <div className="inactivebutton">
            <button onClick={() => {
              this.toggleAssay("clearance_human");
              this.onClick("clearance_human");
              }}
              onMouseEnter={() => {
                this.onHover("clrhuman");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">Human Clearance</div>
              <div className="assay-cost-and-time">
              <p>
                {" "}
                Cost £9,000
                {"\n"}Duration: 3.5 weeks
                </p>
              </div>
              </button>
          </div>
        )}
        {this.state.hover == "clrhuman" && this.props.toggle_help && (
        <div className="hover-info-text-clrhuman">
          <p>
            <div>{this.props.help[2]}</div>
          </p>
        </div>
        )}

        {this.props.toggle_assay.logd && (
          <div className="activebutton">
            <button onClick={() => {
              this.toggleAssay("logd");
              this.onClick("logd");
              }}
              onMouseEnter={() => {
                this.onHover("logd");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">LogD</div>
              <div className="assay-cost-and-time">
              <p>
                  {" "}
                  Cost £1,000
                  {"\n"}Duration: 1.5 week
                </p>
              </div>
              </button>
          </div>
        )}
        {this.props.toggle_assay.logd == false && (
          <div className="inactivebutton">
            <button onClick={() => {
              this.toggleAssay("logd");
              this.onClick("logd");
              }}
              onMouseEnter={() => {
                this.onHover("logd");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">Log D</div>
              <div className="assay-cost-and-time">
                <p>
                  {" "}
                  Cost £1,000
                  {"\n"}Duration: 1.5 week
                </p>
              </div>
              </button>
          </div>
        )}
        {this.state.hover == "logd" && this.props.toggle_help && (
        <div className="hover-info-text-logd">
          <p>
            <div>{this.props.help[3]}</div>
          </p>
        </div>
        )}
        {this.props.toggle_assay.pampa && (
          <div className="activebutton">
            <button onClick={() => {
              this.toggleAssay("pampa");
              this.onClick("pampa");
              }}
              onMouseEnter={() => {
                this.onHover("pampa");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">PAMPA</div>
              <div className="assay-cost-and-time">
              <p>
                  {" "}
                  Cost £700
                  {"\n"}Duration: 1 week
                </p>
              </div>
              </button>
          </div>
        )}
        {this.props.toggle_assay.pampa == false && (
          <div className="inactivebutton">
            <button onClick={() => {
              this.toggleAssay("pampa");
              this.onClick("pampa");
              }}
              onMouseEnter={() => {
                this.onHover("pampa");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">PAMPA</div>
              <div className="assay-cost-and-time">
                <p>
                  {" "}
                  Cost £700
                  {"\n"}Duration: 1 week
                </p>
              </div>
              </button>
          </div>
        )}
        {this.state.hover == "pampa" && this.props.toggle_help && (
        <div className="hover-info-text-pampa">
          <p>
            <div>{this.props.help[4]}</div>
          </p>
        </div>
        )}
        <button
          label="Run_Assays"
          onClick={() => {
            this.onClick("drug_props");
            this.runAssays();
          }}
          onMouseEnter={() => {
            this.onHover("run");
          }}
          onMouseLeave={() => {
            this.onUnHover();
          }}
        >
          <div className="assay-name">Run Assays</div>
        </button>
        {this.state.hover == "run" && this.props.toggle_help && (
          <div className="hover-info-text-run">
            <p>
              <div>{this.props.help[7]}</div>
            </p>
          </div>
        )}
        <button
          label="Run Filters"
          onClick={() => {
            this.onClick("lipinski");
            this.runDescriptorsOrLipinski();
          }}
          onMouseEnter={() => {
            this.onHover("chklip");
          }}
          onMouseLeave={() => {
            this.onUnHover();
          }}
        >
          <div className="assay-name">Lipinski Rules</div>
        </button>
        {this.state.hover == "chklip" && this.props.toggle_help && (
          <div className="hover-info-text-chklip">
            <p>
              <div>{this.props.help[5]}</div>
            </p>
          </div>
        )}
        <button
          label="Calculate Descriptors"
          onClick={() => {
            this.onClick("descriptors");
            this.runDescriptorsOrLipinski();
          }}
          onMouseEnter={() => {
            this.onHover("descr");
          }}
          onMouseLeave={() => {
            this.onUnHover();
          }}
        >
          <div className="assay-name">Descriptors</div>
        </button>
        {this.state.hover == "descr" && this.props.toggle_help && (
          <div className="hover-info-text-descr">
            <p>
              <div>{this.props.help[6]}</div>
            </p>
          </div>
        )}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    selected_mol: state.selector.selected_mol,
    assays_run:
      state.assay.saved_mols[state.selector.selected_mol].data.assays_run,
    time: state.game.time,
    money: state.game.money,
    subtotal: state.game.subtotal,
    help: state.init.help.assay,
    toggle_help: state.assay.toggle_help,
    toggle_assay: state.assay.saved_mols[state.selector.selected_mol].data.toggle_assay,
    all_molecules_assay_data: state.assay.saved_mols,
  };
}

const actionCreators = {
  updateMoney: gameActions.updateMoney,
  updateTime: gameActions.updateTime,
  runAssay: assayActions.runAssay,
  toggleAssay: assayActions.toggleAssay,
};

export default connect(mapStateToProps, actionCreators)(AssayPanel);
