import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import rgroup_img1 from './A01.png'
import rgroup_img2 from './A02.png'
import rgroup_img3 from './A03.png'
import rgroup_img4 from './A04.png'
import rgroup_img5 from './A05.png'
import rgroup_img6 from './A06.png'
  class RGroupWidget extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        img: props.img,
      };
    }
    render(){
      return (
        <img src={this.state.img} alt='R Group'/>
      )
    }
  }
  
  class App extends React.Component {
    render() {
      return (
        <div className="app">
          <h1>Selected R Group:</h1>
          <div className="app-rgroup-selected">
            <RGroupWidget img='http://127.0.0.1:5000/r-group-A01'/>
          </div>
          <h1>R Group Options:</h1>
          <div className="app-rgroup-row1">
            <RGroupWidget img='http://127.0.0.1:5000/r-group-A01'/>
            <RGroupWidget img='http://127.0.0.1:5000/r-group-A02'/>
          </div>
          <div className="app-rgroup-row2">
              <RGroupWidget img='http://127.0.0.1:5000/r-group-A03'/>
              <RGroupWidget img='http://127.0.0.1:5000/r-group-A04'/>
          </div>
          <div className="app-rgroup-row3">
            <RGroupWidget img='http://127.0.0.1:5000/r-group-A05'/>
            <RGroupWidget img='http://127.0.0.1:5000/r-group-A06'/>
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
  
