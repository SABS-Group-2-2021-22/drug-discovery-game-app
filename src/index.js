import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
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
        <img src={this.state.img.img_html} alt='R Group' onClick={this.imageClick} />
      )
    }
  }

   
  
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selected_r_group: 'A04',
      };
    }

    setSelectedRGroupCallback = (r_group_id) => {
      this.setState({selected_r_group: r_group_id}, () => {
        console.log(this.state.selected_r_group)
    })
    }

    render() {
      return (
        <div className="app">
          <h1>Selected R Group:</h1>
          <div className="app-rgroup-selected">
            <RGroupWidget key={this.state.selected_r_group} id={this.state.selected_r_group} callBackFunction={this.setSelectedRGroupCallback}/>
          </div>
          <h1>R Group Options:</h1>
          <div className="app-rgroup-row1">
            <RGroupWidget key='A01' id='A01' selectRGroupCallback={this.setSelectedRGroupCallback}/>
            <RGroupWidget key='A50' id='A50' selectRGroupCallback={this.setSelectedRGroupCallback}/>
          </div>
          <div className="app-rgroup-row2">
            <RGroupWidget key='A03' id='A03' selectRGroupCallback = {this.setSelectedRGroupCallback}/>
            <RGroupWidget key='A04' id='A04' selectRGroupCallback = {this.setSelectedRGroupCallback}/>
          </div>
          <div className="app-rgroup-row3">
            <RGroupWidget key='A05' id='A05' selectRGroupCallback = {this.setSelectedRGroupCallback}/>
            <RGroupWidget key='A06' id='A06' selectRGroupCallback = {this.setSelectedRGroupCallback}/>
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
  
