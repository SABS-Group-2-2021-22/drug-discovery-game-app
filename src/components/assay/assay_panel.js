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
      cost_assays: [],
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

  // add the cost of the assay run and update the cost_assays state
  costAssays = (assay) => {
    let arr = this.state.cost_assays;
    arr.push(assay);
    this.setState({ cost_assays: arr });
  };

  // removes the cost of the assay, will be run if not enough time and money left
  removecostAssays = (assay) => {
    let arr = this.state.cost_assays;
    arr = arr.filter(function (item) {
      return item !== assay;
    });
    this.setState({ cost_assays: arr });
  };

  removeselectedAssays = (assay) => {
    let arr = this.state.selected_assays;
    arr = arr.filter(function (item) {
      return item !== assay;
    });
    this.setState({ selected_assays: arr });
  };

  // clear the list of assay fees
  resetCostAssays = () => {
    this.setState({ cost_assays: [] });
  };

  // update the total time left in the store
  updateTime = () => {
    this.props.updateTime(this.state.cost_assays, this.props.time);
  };

  //update the total money left in the store
  updateMoney = () => {
    this.props.updateMoney(this.state.cost_assays, this.props.money);
  };

  // run the assay (essentially store which have been run and update time and
  // money)
  runAssays = () => {
    let assays_run = this.state.assays_run;
    let selected_assays = this.state.selected_assays;
    const assay_prices = {
      pIC50: 70.0,
      clearance_mouse: 7000.0,
      clearance_human: 9000.0,
      logd: 1000.0,
      pampa: 700.0,
    };
    const assay_times = {
      pIC50: 1.0,
      clearance_mouse: 3.0,
      clearance_human: 3.5,
      logd: 1.5,
      pampa: 1.0,
    };
    console.log(selected_assays)
    for (var i = 0; i < selected_assays.length; i++) {
      if (
        ["drug_props", "lipinski", "descriptors"].includes(selected_assays[i])
      ) {
      } else {
        if (this.props.money - assay_prices[selected_assays[i]] < 0) {
          this.removecostAssays(selected_assays[i]);
          this.removeselectedAssays(selected_assays[i]);
        } else if (this.props.time - assay_times[selected_assays[i]] < 0) {
          this.removecostAssays(selected_assays[i]);
          this.removeselectedAssays(selected_assays[i]);
        } else {
          assays_run[selected_assays[i]] = true;
          this.updateTime();
          this.updateMoney();
        }
      }
    }
    assays_run["drug_props"] = true;
    this.resetCostAssays();
    this.props.runAssay(this.props.selected_mol, assays_run);
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
      this.resetCostAssays();
    }
  }

  onHover = (label) => {
    this.setState({ hover: label });
    console.log(this.state.hover);
  };

  onUnHover = () => {
    this.setState({ hover: [] });
    console.log(this.state.hover);
  };

  toggleAssay = (button) => {
    if (this.props.toggle_assay[button]) {
      this.props.toggleAssay(button,false);
    } else {
      console.log(this.props.toggle_assay[button])
      // console.log(this.props.toggle_assay.button)
      this.props.toggleAssay(button,true);
    }
  }
// or this.props.toggle_assay.button
  render() {
    return(
      <div className="assay-panel">
        {this.props.toggle_assay.pic50 && (
          <div className="activebutton">
            <button onClick={() => {
              this.toggleAssay("pic50");
              this.onClick("pic50");
              this.costAssays("pic50")
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
        {this.props.toggle_assay.pic50 == false && (
          <div className="inactivebutton">
            <button onClick={() => {
              this.toggleAssay("pic50");
              this.onClick("pic50");
              this.costAssays("pic50")
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
              this.costAssays("clearance_mouse")
              }}
              onMouseEnter={() => {
                this.onHover("clearance_mouse");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">Clearance Mouse</div>
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
              this.costAssays("clearance_mouse")
              }}
              onMouseEnter={() => {
                this.onHover("clearance_mouse");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">Clearance Mouse</div>
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
              this.costAssays("clearance_human")
              }}
              onMouseEnter={() => {
                this.onHover("clearance_human");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">Clearance Human</div>
              <div className="assay-cost-and-time">
                Cost £9,000
                {"\n"}Duration: 3.5 weeks
              </div>
              </button>
          </div>
        )}
        {this.props.toggle_assay.clearance_human == false && (
          <div className="inactivebutton">
            <button onClick={() => {
              this.toggleAssay("clearance_human");
              this.onClick("clearance_human");
              this.costAssays("clearance_human")
              }}
              onMouseEnter={() => {
                this.onHover("clearance_human");
              }}
              onMouseLeave={() => {
                this.onUnHover();
              }}
              >
              <div className="assay-name">Clearance Human</div>
              <div className="assay-cost-and-time">
                Cost £9,000
                {"\n"}Duration: 3.5 weeks
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
              this.costAssays("logd")
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
              this.costAssays("logd")
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
              this.costAssays("pampa")
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
              this.costAssays("pampa")
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
          <div className="assay-name">Check Lipinski Rules</div>
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
          <div className="assay-name">Calculate Descriptors</div>
        </button>
        {this.state.hover == "descr" && this.props.toggle_help && (
          <div className="hover-info-text-descr">
            <p>
              <div>{this.props.help[5]}</div>
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
    help: state.init.help.assay,
    toggle_help: state.assay.toggle_help,
    invoice_display: state.assay.invoice_display,
    invoice: state.assay.invoice,
    selected_assays: state.assay.selected_assays,
    assay_prices: state.assay.assay_prices,
    toggle_assay: state.assay.toggle_assay,
  };
}

const actionCreators = {
  updateMoney: gameActions.updateMoney,
  updateTime: gameActions.updateTime,
  runAssay: assayActions.runAssay,
  toggleAssay: assayActions.toggleAssay
};

export default connect(mapStateToProps, actionCreators)(AssayPanel);
