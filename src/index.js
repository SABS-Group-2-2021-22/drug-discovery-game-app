import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./index.css";


class RGroupWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      group_nr: props.r_group_nr,
      img: 'Null',
    };
    this.fetchImage();
  }


  sendRGroup = (r_group_id, r_group_nr) => {
    this.props.selectRGroupCallback(r_group_id, r_group_nr);
  }

  imageClick = () => {
    this.sendRGroup(this.state.id, this.state.group_nr)
  }

  fetchImage = () => {
    const url = 'http://127.0.0.1:5000/r-group-'
    fetch(url + this.state.id)
      .then((response) => response.json())
      .then(img_data => {
        this.setState({ img: img_data })
      })
      .catch(err => {
        throw Error(err.message);
      });
  }

  render() {
    return (
      <div class="card" style={{ width: "20rem" }} >
        <div class="container">
          <img src={this.state.img.img_html} alt='R Group' onClick={this.imageClick} />
        </div>
        <div class="card-body">
          <RGroupStats />
        </div>
      </div>
    )
  }
}

class RGroupStats extends React.Component {
  render() {
    return (
      <div class="container" className="r_group_stats">
        <div class="row">
          <div class="col">
            MW = TEST
            <div />
          </div>
          <div class="row">
            <div class="col">
              logP = TEST
            </div>
            <div class="col">
              TPSA = TEST
            </div>
          </div>
          <div class="row">
            <div class="col">
              HA = TEST
            </div>
            <div class="col">
              Hydrogen Acceptors = TEST
            </div>
          </div>
          <div class="row">
            <div class="col">
              Hydrogen Donors = TEST
            </div>
            <div class="col">
              Rings = TEST
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
    };
    this.fetchImage();
  }

  fetchImage = () => {
    const base_url = 'http://127.0.0.1:5000/molecule'

    
    fetch(base_url + '?r1=' + this.state.r_groups[0]+ '&r2=' + this.state.r_groups[1])
      .then((response) => response.json())
      .then(img_data => {
        this.setState({ img: img_data })
      })
      .catch(err => {
        throw Error(err.message);
      });
  }

  render() {
    return (
      <div className="current_drug">
        <img src={this.state.img.img_html} alt='AO1' />
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
    var id_list = this.state.selected_r_group ;
    id_list[r_group_nr-1] = r_group_id ;
    this.setState({ selected_r_group: id_list }, () => {
      console.log(this.state.selected_r_group) ;
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


// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

