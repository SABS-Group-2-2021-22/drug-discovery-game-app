import React from "react";
import "./assay.css";
import { connect } from "react-redux";
import { assayActions, gameActions } from "../../actions";

class AssayPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_assays: [],
      assays_run: '',
      selected_mol: '',
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

  toggleHelp() {
    if (this.props.toggle_help) {
      this.props.toggleHelp(false);
    } else {
      this.props.toggleHelp(true);
    }
    console.log(this.props.toggle_help)
  }

  runAssaysLimit = () => {
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

    for (var molecule_key in this.props.all_molecules_assay_data) {

      let assays_run = this.props.all_molecules_assay_data[molecule_key].data.assays_run;
      let toggle_assay_dict = this.props.all_molecules_assay_data[molecule_key].data.toggle_assay;

      // iterate through toggle_assay, if assay_value is true, add to selected assay
      let arr = []
      for (var key in toggle_assay_dict) {
        if (toggle_assay_dict[key]) {
          arr.push(key)
        }
      }
      let selected_assays = arr;

      for (var i = 0; i < selected_assays.length; i++) {
        if (
          ["drug_props", "lipinski", "descriptors"].includes(selected_assays[i])
        ) { }
        else {
          if (!assays_run[selected_assays[i]]) {
            if (max_time < ASSAY_TIMES[selected_assays[i]]) {
              max_time = ASSAY_TIMES[selected_assays[i]];
            }
            total_cost = total_cost + ASSAY_PRICES[selected_assays[i]];
          }
        }
      }
    }
    let cost = {
      'time': max_time,
      'money': total_cost,
    }
    return cost
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
    let cost_sum = 0;

    for (var molecule_key in this.props.all_molecules_assay_data) {
      let assays_run = this.props.all_molecules_assay_data[molecule_key].data.assays_run;
      let toggle_assay_dict = this.props.all_molecules_assay_data[molecule_key].data.toggle_assay;

      // iterate through toggle_assay, if assay_value is true, add to selected assay
      let arr = []
      for (var key in toggle_assay_dict) {
        if (toggle_assay_dict[key]) {
          arr.push(key)
        }
      }
      let selected_assays = arr;

      // iterate through selected assays and ensure that they do not exceed cost/time limits
      for (var i = 0; i < selected_assays.length; i++) {
        if (!["drug_props", "lipinski", "descriptors"].includes(selected_assays[i]) && !assays_run[selected_assays[i]]) {
          cost_sum += ASSAY_PRICES[selected_assays[i]];
          if (ASSAY_TIMES[selected_assays[i]] > max_time) {
            max_time = ASSAY_TIMES[selected_assays[i]]
          }
        }
      }
    }

    if (this.props.money - cost_sum < 0 || this.props.time - max_time < 0) {
      for (let molecule_key in this.props.all_molecules_assay_data) {
        let toggle_assay_dict = this.props.all_molecules_assay_data[molecule_key].data.toggle_assay;

        let arr = []
        for (let key in toggle_assay_dict) {
          if (toggle_assay_dict[key]) {
            arr.push(key)
          }
        }
        let selected_assays = arr;

        for (let i = 0; i < selected_assays.length; i++) {
          this.removeselectedAssays(selected_assays[i]);
        }
      }
      window.alert("Your choice of assays exceeds the cost and time limits! Please unselect some assays or proceed to Analysis");
    } else {
      for (let molecule_key in this.props.all_molecules_assay_data) {
        let assays_run = this.props.all_molecules_assay_data[molecule_key].data.assays_run;
        let toggle_assay_dict = this.props.all_molecules_assay_data[molecule_key].data.toggle_assay;

        let arr = []
        for (let key in toggle_assay_dict) {
          if (toggle_assay_dict[key]) {
            arr.push(key)
          }
        }
        let selected_assays = arr;

        for (let i = 0; i < selected_assays.length; i++) {
          if (!["drug_props", "lipinski", "descriptors"].includes(selected_assays[i])) {
            if (!assays_run[selected_assays[i]]) {
              assays_run[selected_assays[i]] = true;
              if (max_time < ASSAY_TIMES[selected_assays[i]]) {
                max_time = ASSAY_TIMES[selected_assays[i]];
              }
              total_cost = total_cost + ASSAY_PRICES[selected_assays[i]];
            }
          }
        }
        assays_run["drug_props"] = true;
        this.props.runAssay(molecule_key, assays_run);
      }
      this.updateTime(max_time);
      this.updateMoney(total_cost);
    }

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
  onClick = (label, isDisabled) => {
    let arr = this.state.selected_assays;
    if (!isDisabled) {
      if (!arr.includes(label)) {
        arr.push(label);
      }
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

  toggleAssay = (assay_type, mol_id) => {
    let toggle_assay = this.props.saved_mols[mol_id].data.toggle_assay;
    if (toggle_assay[assay_type]) {
      this.props.toggleAssay(mol_id, assay_type, false);
    } else {
      this.props.toggleAssay(mol_id, assay_type, true);
    }
  }

  checkAssaysRun = (assay_type, mol_id) => {
    let assays_run = this.props.all_molecules_assay_data[mol_id].data.assays_run;
    return assays_run[assay_type];
  }

  render() {
    const data = Object.keys(this.props.all_molecules_assay_data);
    const cost_color = {
      color: (this.props.money - this.runAssaysLimit().money >= 0 ? "white" : "red"),
    };
    const duration_color = {
      color: (this.props.time - this.runAssaysLimit().time >= 0 ? "white" : "red"),
    };
    const formatted_help = this.props.help[0].replace('^-6', '<sup>-6</sup>').replace(/50/g, '<sub>50</sub>');
    return (
      <div className="assay-panel">
        <table className="assay-table" style={{ overflowWrap: 'break-word' }}>
          <colgroup width="100%">
            <col width="15%" />
            <col className="assay-table-column" />
            <col className="assay-table-column" />
            <col className="assay-table-column" />
            <col className="assay-table-column" />
            <col className="assay-table-column" />
          </colgroup>
          <thead style={{ verticalAlign: "text-top" }}>
            <tr className="header-cells">
              <th style={{ backgroundColor: 'white' }}>
                <div className="help-toggle">
                  {this.props.toggle_help && (
                    <div className="toggle-activebutton">
                      <button
                        onClick={() => this.toggleHelp()}
                        onMouseEnter={() => {
                          this.onHover("help");
                        }}
                        onMouseLeave={() => {
                          this.onUnHover();
                        }}
                      >
                        ?
                      </button>
                    </div>
                  )}
                  {this.props.toggle_help === false && (
                    <div className="toggle-inactivebutton">
                      <button
                        onClick={() => this.toggleHelp()}
                        onMouseEnter={() => {
                          this.onHover("help");
                        }}
                        onMouseLeave={() => {
                          this.onUnHover();
                        }}
                      >
                        ?
                      </button>
                    </div>
                  )}
                </div>
              </th>
              <th
                onMouseEnter={() => {
                  this.onHover("clrmouse");
                }}
                onMouseLeave={() => {
                  this.onUnHover();
                }}
              >
                Mouse <br /> Clearance
              </th>
              <th
                onMouseEnter={() => {
                  this.onHover("clrhuman");
                }}
                onMouseLeave={() => {
                  this.onUnHover();
                }}
              >
                {" "}Human <br />Clearance
              </th>
              <th
                onMouseEnter={() => {
                  this.onHover("logd");
                }}
                onMouseLeave={() => {
                  this.onUnHover();
                }}
              >
                LogD
              </th>
              <th
                onMouseEnter={() => {
                  this.onHover("pampa");
                }}
                onMouseLeave={() => {
                  this.onUnHover();
                }}
              >
                PAMPA
              </th>
              <th
                onMouseEnter={() => {
                  this.onHover("pic50");
                }}
                onMouseLeave={() => {
                  this.onUnHover();
                }}
              >
                pIC<sub>50</sub>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>Cost per assay</b></td>
              <td>£7,000</td>
              <td>£9,000</td>
              <td>£1,000</td>
              <td>£700</td>
              <td>£70</td>
            </tr>
            <tr className="border-bottom">
              <td><b>Duration</b></td>
              <td>3 weeks</td>
              <td>3.5 weeks</td>
              <td>1.5 weeks</td>
              <td>1 week</td>
              <td>1 week</td>
            </tr>
            <tr>
              <td><b>Molecule</b></td>
              <td>{" "}</td>
              <td>{" "}</td>
              <td>{" "}</td>
              <td>{" "}</td>
              <td>{" "}</td>
            </tr>
            {data.map((val, index) => (
              <tr key={val} className={index % 2 === 0 ? 'even' : 'odd'}>
                <td>{val}</td>
                <td>
                  <input type="checkbox"
                    id={"clearance_mouse" + val}
                    disabled={this.checkAssaysRun("clearance_mouse", val) || false}
                    checked={this.checkAssaysRun("clearance_mouse", val)}
                    onChange={() => {
                      this.toggleAssay("clearance_mouse", val);
                      const isDisabled = this.checkAssaysRun("clearance_mouse", val);
                      this.onClick("clearance_mouse", isDisabled);
                    }}
                  />
                </td>
                <td>
                  <input type="checkbox"
                    id={"clearance_human" + val}
                    disabled={this.checkAssaysRun("clearance_human", val) || false}
                    checked={this.checkAssaysRun("clearance_human", val)}
                    onChange={() => {
                      this.toggleAssay("clearance_human", val);
                      const isDisabled = this.checkAssaysRun("clearance_human", val);
                      this.onClick("clearance_human", isDisabled);
                    }}
                  />
                </td>
                <td>
                  <input type="checkbox"
                    id={"logd" + val}
                    disabled={this.checkAssaysRun("logd", val) || false}
                    checked={this.checkAssaysRun("logd", val)}
                    onChange={() => {
                      this.toggleAssay("logd", val);
                      const isDisabled = this.checkAssaysRun("logd", val);
                      this.onClick("logd", isDisabled);
                    }}
                  />
                </td>
                <td>
                  <input type="checkbox"
                    id={"pampa" + val}
                    disabled={this.checkAssaysRun("pampa", val) || false}
                    checked={this.checkAssaysRun("pampa", val)}
                    onChange={() => {
                      this.toggleAssay("pampa", val);
                      const isDisabled = this.checkAssaysRun("pampa", val);
                      this.onClick("pampa", isDisabled);
                    }}
                  />
                </td>
                <td>
                  <input type="checkbox"
                    id={"pIC50" + val}
                    disabled={this.checkAssaysRun("pIC50", val) || false}
                    checked={this.checkAssaysRun("pIC50", val)}
                    onChange={() => {
                      this.toggleAssay("pIC50", val);
                      const isDisabled = this.checkAssaysRun("pIC50", val);
                      this.onClick("pIC50", isDisabled);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {this.state.hover === "clrmouse" && this.props.toggle_help && (
          <div className="hover-info-text-clrmouse">
            <p>
              <div>{this.props.help[1]}</div>
            </p>
          </div>
        )}
        {this.state.hover === "clrhuman" && this.props.toggle_help && (
          <div className="hover-info-text-clrhuman">
            <p>
              <div>{this.props.help[2]}</div>
            </p>
          </div>
        )}
        {this.state.hover === "logd" && this.props.toggle_help && (
          <div className="hover-info-text-logd">
            <p>
              <div>{this.props.help[3]}</div>
            </p>
          </div>
        )}
        {this.state.hover === "pampa" && this.props.toggle_help && (
          <div className="hover-info-text-pampa">
            <p>
              <div>{this.props.help[4]}</div>
            </p>
          </div>
        )}
        {this.state.hover === "pic50" && this.props.toggle_help && (
          <div className="hover-info-text-pic50">
            <p><div><p dangerouslySetInnerHTML={{ __html: formatted_help }}></p></div></p>
          </div>
        )}
        {this.state.hover === "help" && (
          <div className="hover-info-text-help">
            <p>
              <div>{this.props.help[9]}</div>
            </p>
          </div>
        )}
        <div className="final-order">
          <div className="run-assay-button">
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
              <div className="assay-name"><b>Run Assays</b></div>
              <div className="invoice-amount">
                <div style={duration_color}>
                  Duration: {this.runAssaysLimit().time} weeks
                </div>
                <div style={cost_color}>
                  Cost: £{this.runAssaysLimit().money}
                </div>
              </div>
            </button>
            {this.state.hover === "run" && this.props.toggle_help && (
              <div className="hover-info-text-run">
                <p>
                  <div>{this.props.help[6]}</div>
                </p>
              </div>
            )}
          </div>
        </div>
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
    saved_mols: state.assay.saved_mols,
    all_molecules_assay_data: state.assay.saved_mols,
  };
}

const actionCreators = {
  updateMoney: gameActions.updateMoney,
  updateTime: gameActions.updateTime,
  runAssay: assayActions.runAssay,
  toggleAssay: assayActions.toggleAssay,
  toggleHelp: assayActions.toggleHelp,
};

export default connect(mapStateToProps, actionCreators)(AssayPanel);
