import React from 'react';
import "./home.css";
import { Link } from "react-router-dom"
import pymolpic from './pymolMMP12.png'


function Home() {
    return (
        <div className="wrapper">
            <div className="home">
                <div className="hometitle">Welcome to the Drug Discovery Game </div>
                <div className="pic-and-text">
                    <div className="picture"> <img src={pymolpic} /> </div>
                    <div className="text">
                        MMP-12 is an 18 kDa, monomeric enzyme implicated in emphysema and
                        asthma, and has been identified
                        as a target with therapeutic potential. Your job is to design a potent inhibitor of MMP12 with
                        good lipophilicity, medium to high permeability, and good metabolic stability. You have
                        30 weeks and £100,000 to design, assay, and screen your
                        molecules. At the end you will have to pick a final molecule to take forward.
                        </div>
                    </div>
                    <div className="button-area">
                            <div className="control-panel">
                                <Link to='/app'>
                                    <button>Start</button>
                                </Link>
                            </div>
                </div>
            </div>

        </div >
    );
}


export default Home;