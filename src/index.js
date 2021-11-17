import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';        //TODO: this looks like an install / import error, directly importing this is bad practice?
import "./index.css";
import A01_file from '/home/sabsr3/DrugDiscoveryGame/drug-discovery-game-app/src/A01.png';
import Full_Molecule_file from '/home/sabsr3/DrugDiscoveryGame/drug-discovery-game-app/src/A01_B01_scaffold.png';

// USE BOOTSTRAP - ITS SO USEFUL

  class RGroupWidget extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        id: props.id,
        img: 'Null',
      };
      this.fetchImage();
    }

    
    sendRGroup = (r_group_id) => {
      this.props.selectRGroupCallback(r_group_id);
    }
    
    imageClick = () => {
      this.sendRGroup(this.state.id)
    }

    fetchImage = () => {
      const url = 'http://127.0.0.1:5000/r-group-'
      fetch(url+this.state.id)
        .then( (response) => response.json())
        .then( img_data => { 
                    this.setState({img: img_data }) })
        .catch(err => {
          throw Error(err.message);
        });
    }

    render(){
      return (
        <div class = "container">
        <img src={this.state.img.img_html} alt='R Group' onClick={this.imageClick} />
        </div>
      )
    }
  }

  class R_Group_Stats extends React.Component{
    render(){
      return(
        <div class="container" className="r_group_stats">
        <div class="row">
          <div class="col">
            MW = TEST
          <div/>
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

  class R_Group_Image extends React.Component{
    render(){
      return(
        <div class = "container">
          <img src={A01_file} alt='AO1'/>
        </div>
      )
    }
  }

  class Full_Image extends React.Component{
    render(){
      return(
        <div className="current_drug">
          <img src={Full_Molecule_file} alt='AO1'/>
        </div>
      )
    }
  }
  
  class R_Group_Card extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        selected_r_group: 'A04',
        id: props.id,
      };
    }

    setSelectedRGroupCallback = (r_group_id) => {
      this.setState({selected_r_group: r_group_id}, () => {
        console.log(this.state.selected_r_group)
    })
    }
    render(){

      return(
        <div class="card" style={{width: "20rem"}} >
        <RGroupWidget key={this.state.id} id={this.state.id} selectRGroupCallback={this.setSelectedRGroupCallback}/>
        <div class="card-body">
          <R_Group_Stats/>
        </div>
      </div>
      )
    }
  }



  class R_Group_Card_List extends React.Component{
    render(){
      return(
        <div class='container' className="r_group_list">
          {Array.from({ length: 8}, (_, i) => <R_Group_Card id={'A0' + (i+1).toString()}/>)}
        </div>
      )
    }
  }
  
  class App extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     selected_r_group: 'A04',
    //   };
    // }

    // setSelectedRGroupCallback = (r_group_id) => {
    //   this.setState({selected_r_group: r_group_id}, () => {
    //     console.log(this.state.selected_r_group)
    // })
    // }

    render() {
      return (
        <div class="container" className = "app">
          <div class="row">
          <div class ="col-3">
            <R_Group_Card_List/>
          </div>
          <div  class ="col-3">
            <R_Group_Card_List/>
          </div>
          <div  class ="col-6">
            <Full_Image/>
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
  
