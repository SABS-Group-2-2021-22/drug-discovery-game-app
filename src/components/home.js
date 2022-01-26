import React from 'react';
import "./home.css";
import { Link } from "react-router-dom"
import pymolpic from './pymolMMP12.png'
import sabs from './sabs-logo.png'
import oxuni from './oxlogo-sq-border.png'
import roche from './Roche.png'
import epsrc from './EPSRC_logo.png'


function Home() {
    return (
        <div className="wrapper">
            <div className="home">
                <div className="hometitle">Welcome to the Drug Discovery Game </div>
                <div className="pic-and-text">
                    <div className="picture"> {/*trying to add in docked version instead - can jsut delete commented out stuff. It doesn't work at the moment*/}
                    {/* <script src="https://3Dmol.org/build/3Dmol-min.js" async></script>     
         <div style="height: 400px; width: 400px; position: relative;" class='viewer_3Dmoljs' data-pdb='2POR' data-backgroundcolor='0xffffff' data-style='stick' ></div>     */}
                         <img src={pymolpic} />
                          </div>
                    <div className="text">
                        MMP-12 is an 18 kDa, monomeric enzyme implicated in emphysema and
                        asthma, and has been identified
                        as a target with therapeutic potential. Your job is to design a potent inhibitor of MMP12 with
                        good lipophilicity, medium to high permeability, and good metabolic stability. You have
                        30 weeks and £100,000 to design, assay, and screen your
                        molecules. At the end you will have to pick a final molecule to take forward.
                        <div className="button-area">
                        </div>
                        <div className="control-panel">
                            <Link to='/build'>
                                <button>Start</button>
                            </Link>
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


export default Home;