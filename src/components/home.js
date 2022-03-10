import React from 'react';
import "./home.css";
import { Link } from "react-router-dom"
import { connect } from 'react-redux';
import pymolpic from '../assets/pymolMMP12.png'

import sabs from '../assets/sabs-logo.png'
import oxuni from '../assets/oxlogo-sq-border.png'
import roche from '../assets/Roche.png'
import epsrc from '../assets/EPSRC_logo.png'


import { render } from 'react-dom';

class _Home extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <div className="home">
                    <div className="hometitle">Welcome to the Drug Discovery Game </div>
                    <div className="pic-and-text">
                        <div className="picture"> <img src={pymolpic} /> </div>
                        <div className="text-and-button">
                            <div className="text">
                                MMP-12 is an 18 kDa, monomeric enzyme implicated in emphysema and
                                asthma, and has been identified
                                as a target with therapeutic potential. Your job is to design a potent inhibitor of MMP12 with
                                good lipophilicity, medium to high permeability, and good metabolic stability. You have
                                30 weeks and £100,000 to design, assay, and screen your
                                molecules. At the end you will have to pick a final molecule to take forward.
                            </div>
                            <div className="control-panel">
                                {this.props.loggedIn ?
                                    <Link to='/build'>
                                        <button>Start</button>
                                    </Link>
                                    : <Link to='/login'>
                                        <button>Start</button>
                                    </Link>}
                            </div>
                        </div>
                    </div>

                    <div className="button-and-logo-area"> {/*actually no longer conatins the start button */}
                        <div className="logos-area">
                            <div className="logo"> <img src={sabs} height='120px' />  </div>
                            <div className="logo"> <img src={epsrc} height='100px' /> </div>
                            <div className="logo"> <img src={oxuni} height='100px' /> </div>
                            <div className="logo"> <img src={roche} height='100px' /> </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

function mapState(state) {
    const { login } = state;
    const { loggedIn } = login;
    return { loggedIn };
}

const Home = connect(mapState)(_Home);
export default Home;