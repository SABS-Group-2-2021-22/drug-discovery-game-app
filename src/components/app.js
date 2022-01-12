import React from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom"
import "./app.css";


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
      <div className="r-group-container">
      <div className="r-group-card" >
          <img className="r-group-img" src={this.state.img} alt='R Group' onClick={this.imageClick} />
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
            MW: {Number(this.state.stats_dict.MW).toFixed(1)} Da
            <div />
          </div>
          <div class="row">
            <div class="col">
              logP: {Number(this.state.stats_dict.logP).toFixed(2)}
            </div>
            <div class="col">
              TPSA: {Number(this.state.stats_dict.TPSA).toFixed(2)}
            </div>
          </div>
          <div class="row">
            <div class="col">
              HA: {this.state.stats_dict.HA}
            </div>
            <div class="col">
              H Acc.: {this.state.stats_dict.h_acc}
            </div>
          </div>
          <div class="row">
            <div class="col">
              H Don.: {this.state.stats_dict.h_don}
            </div>
            <div class="col">
              Rings: {this.state.stats_dict.rings}
            </div>
          </div>
        </div>
      </div>
    )
  }
}




class RGroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r_group_category: props.r_group_category,
      r_group_map: {1: 'A', 2: 'B'},
    };
  }

  render() {
    return (
    <div className='r-group-list' >
      {Array.from({ length: 9 }, (_, i) =>
        <RGroupWidget key={this.state.r_group_map[this.state.r_group_category] + '0' + (i + 1).toString()}
          id={this.state.r_group_map[this.state.r_group_category] + '0' + (i + 1).toString()}
                r_group_nr={this.state.r_group_category}
            selectRGroupCallback={this.props.selectRGroupCallback} />).concat(
            Array.from({ length: 41 }, (_, i) =>
              <RGroupWidget key={this.state.r_group_map[this.state.r_group_category] + (i + 10).toString()}
                id={this.state.r_group_map[this.state.r_group_category] + (i + 10).toString()}
                r_group_nr={this.state.r_group_category}
                selectRGroupCallback={this.props.selectRGroupCallback} />)

          )}
    </div>
    );
  }
}


class MoleculeImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      r_groups: props.r_groups,
      img: 'Null',
      drug_stats: 'Null',
      size: props.size
    };
    this.fetchImage();
  }

  fetchImage = () => {
    const base_url = 'http://127.0.0.1:5000/molecule'


    fetch(base_url + '?r1=' + this.state.r_groups[0] + '&r2=' + this.state.r_groups[1] +
          '&size=' + this.state.size)
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
      <div class="molecule">
        <img src={this.state.img} alt='Drug' />
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
              pIC_50 = {this.state.stats_dict.pic50}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_r_groups: props.current_r_groups,
    };
  }

  saveMolecule = () => {
    const base_url = 'http://127.0.0.1:5000/save'
    fetch(base_url + '?r1=' + this.state.current_r_groups[0] 
                   + '&r2=' + this.state.current_r_groups[1], 
                   {method: 'POST'})
      }

  render() {
    const { text } = this.state;
    return (
      <div className="control-panel">
        <button>Clear</button>
        <button onClick={this.saveMolecule}>Save</button>
        <Link to='/assay'>
          <button>Assay</button>
        </Link>
      </div>
    );
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
      <div className="wrapper">
        <div className="app">
          <div className="r-group-selection">
            <RGroupList r_group_category={1} selectRGroupCallback={this.setSelectedRGroupCallback}/>
            <RGroupList r_group_category={2} selectRGroupCallback={this.setSelectedRGroupCallback}/>
          </div>
          <div className="mol-visbox">
            <div className="rendered-molecule">
              <MoleculeImage key={this.state.selected_r_group} r_groups={this.state.selected_r_group} 
                            size={"800,800"} />
            </div>
            <ControlPanel current_r_groups={this.state.selected_r_group}/>
          </div>
        </div>
      </div>

    );
  }
}


export {MoleculeImage, }

export default App;

{/* // ========================================

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// ); */}

