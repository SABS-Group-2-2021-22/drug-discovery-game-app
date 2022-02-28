import React from "react";
import "miew/dist/miew.min.css";
import { StandaloneStructServiceProvider } from "ketcher-standalone";
import { Editor} from "ketcher-react";
import { Ketcher }  from "ketcher-core";
import "ketcher-react/dist/index.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Miew from "miew";
import { saveSketchedMolecule} from "../../actions/actions";
import { resolveTypeReferenceDirective } from "typescript";
import userEvent from "@testing-library/user-event";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SketcherControlPanel from "./sketcher_control_panel";
import {Dispatch} from 'redux';
const { base64encode, base64decode } = require('nodejs-base64');


(window as any).Miew = Miew;

const structServiceProvider = new StandaloneStructServiceProvider();

type SketcherType = {
  saveSketchedMoleculeChild: any
}

export class Sketcher extends React.Component <SketcherType>{
  ketcher: Ketcher;

  constructor(props: any) {
    super(props);
    this.handleOnInit = this.handleOnInit.bind(this);
    this.logMolecule = this.logMolecule.bind(this);
    this.triggerSaving = this.triggerSaving.bind(this);
  }

  static defaultProps = {profileStore:{}}

  handleOnInit = async (ketcher: Ketcher) => {
    this.ketcher = ketcher;
    (window as any).ketcher = ketcher;
  };

  logMolecule = async () => {
    const mol = await this.ketcher.getMolfile();
    const multiline_mol = Buffer.from(mol).toString('base64')
    const url = 'http://127.0.0.1:5000/sketcher_save_molecule?' +
    'mol=' + multiline_mol
  fetch(url)
    .then((response) => response.json())
    .then((response) => {console.log(response);})
    ;
  }

  

  triggerSaving = async () => {
      const mol = await this.ketcher.getMolfile();
      const multiline_mol = Buffer.from(mol).toString('base64')
      console.log(multiline_mol)
      this.props.saveSketchedMoleculeChild(multiline_mol)
  }

  render() {
    return (
      <div>
        <Editor
          staticResourcesUrl={""}
          structServiceProvider={structServiceProvider}
          onInit={this.handleOnInit}
          errorHandler ={(message: string) => null}
        />     
        <SketcherControlPanel triggerSaving = {this.triggerSaving }/>
      </div>
      
    );
  }
}

export default Sketcher
