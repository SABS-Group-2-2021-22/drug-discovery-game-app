import React from 'react';
// import ReactDOM from 'react-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import "./index.css";


class RGroupWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      group_nr: props.r_group_nr,
      img: 'Null',
      stats: 'Null',
    };
    this.fetchRGroup();
  }


  sendRGroup = (r_group_id, r_group_nr) => {
    this.props.selectRGroupCallback(r_group_id, r_group_nr);
  }

  imageClick = () => {
    this.sendRGroup(this.state.id, this.state.group_nr)
  }

  fetchRGroup = () => {
    const url = 'http://127.0.0.1:5000/r-group-'
    fetch(url + this.state.id)
      .then((response) => response.json())
      .then(r_group => {
        this.setState({ img: r_group.img_html })
        this.setState({ stats: r_group.stats })
      })
      .catch(err => {
        throw Error(err.message);
      });
  }

  render() {
    return (
      <div class="card" style={{ width: "20rem" }} >
        <div class="container">molselection
          <img src={this.state.img} alt='R Group' onClick={this.imageClick} />
        </div>
        <div class="card-body">
          <RGroupStats key={this.state.stats} stats={this.state.stats} />
        </div>
      </div>
    )
  }
}

class RGroupStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats_dict: props.stats,
    };
  }
  render() {
    return (
      <div class="container" className="r_group_stats">
        <div class="row">
          <div class="col">
            MW = {this.state.stats_dict.MW}
            <div />
          </div>
          <div class="row">
            <div class="col">
              logP = {this.state.stats_dict.logP}
            </div>
            <div class="col">
              TPSA = {this.state.stats_dict.TPSA}
            </div>
          </div>
          <div class="row">
            <div class="col">
              HA = {this.state.stats_dict.HA}
            </div>
            <div class="col">
              Hydrogen Acceptors = {this.state.stats_dict.h_acc}
            </div>
          </div>
          <div class="row">
            <div class="col">
              Hydrogen Donors = {this.state.stats_dict.h_don}
            </div>
            <div class="col">
              Rings = {this.state.stats_dict.rings}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


class MoleculeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r_groups: props.r_groups,
      img: 'Null',
      drug_stats: 'Null',
    };
    this.fetchImage();
  }

  fetchImage = () => {
    const base_url = 'http://127.0.0.1:5000/molecule'


    fetch(base_url + '?r1=' + this.state.r_groups[0] + '&r2=' + this.state.r_groups[1])
      .then((response) => response.json())
      .then(molecule => {
        this.setState({ img: molecule.img_html })
        this.setState({ drug_stats: molecule.drug_props })
        console.log(molecule.drug_props)
      })
      .catch(err => {
        throw Error(err.message);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="container">
          <img src={this.state.img} alt='Drug' />
        </div>
        <div class="card-body">
          <MoleculeStats key={this.state.drug_stats} stats={this.state.drug_stats} />
        </div>
      </div>
    )
  }
}


class MoleculeStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats_dict: props.stats,
    };
  }
  render() {
    return (
      <div class="container" className="molecule_stats">
        <div class="row">
          <div class="col">
            Human Clearance = {this.state.stats_dict.clearance_human}
            <div />
          </div>
          <div class="row">
            <div class="col">
              Mouse Clearance = {this.state.stats_dict.clearance_mouse}
            </div>
            <div class="col">
              log d = {this.state.stats_dict.logd}
            </div>
          </div>
          <div class="row">
            <div class="col">
              pampa = {this.state.stats_dict.pampa}
            </div>
            <div class="col">
              Pic 50 = {this.state.stats_dict.pic50}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_r_group: ['A01', 'B01'],
    };
  }

  setSelectedRGroupCallback = (r_group_id, r_group_nr) => {
    var id_list = this.state.selected_r_group;
    id_list[r_group_nr - 1] = r_group_id;
    this.setState({ selected_r_group: id_list }, () => {
      console.log(this.state.selected_r_group);
    })
  }

  render() {
    return (
      <div class="container" className="app">
        <div class="row">
          <div class="col-3">
            <div class='container' className="r_group_list">
              {Array.from({ length: 8 }, (_, i) =>
                <RGroupWidget key={'A0' + (i + 1).toString()} id={'A0' + (i + 1).toString()} r_group_nr={1} selectRGroupCallback={this.setSelectedRGroupCallback} />)}
            </div>
          </div>
          <div class="col-3">
            <div class='container' className="r_group_list">
              {Array.from({ length: 8 }, (_, i) =>
                <RGroupWidget key={'B0' + (i + 1).toString()} id={'B0' + (i + 1).toString()} r_group_nr={2} selectRGroupCallback={this.setSelectedRGroupCallback} />)}
            </div>
          </div>
          <div class="col-6">
            <MoleculeImage key={this.state.selected_r_group} r_groups={this.state.selected_r_group} />
          </div>
        </div>
      </div>
    );
  }
}


export default App;

// ========================================

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
