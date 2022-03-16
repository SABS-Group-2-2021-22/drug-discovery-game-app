import React from "react";
import "miew/dist/miew.min.css";
import { StandaloneStructServiceProvider } from "ketcher-standalone";
import { Editor} from "ketcher-react";
import { Ketcher }  from "ketcher-core";
import "ketcher-react/dist/index.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Miew from "miew";
import SketcherControlPanel from "./sketcher_control_panel";


(window as any).Miew = Miew;

const structServiceProvider = new StandaloneStructServiceProvider();

type SketcherType = {
  saveSketchedMoleculeChild: any
}

export class Sketcher extends React.Component <SketcherType>{
  ketcher: Ketcher;

  constructor(props: any) {
    super(props);
  }

  static defaultProps = {profileStore:{}}

  handleOnInit = async (ketcher: Ketcher) => {
    this.ketcher = ketcher;
    (window as any).ketcher = ketcher;
    const initial_data = "O=C(O)C(NS(=O)(=O)c1ccccc1)"
    this.ketcher.setMolecule(initial_data);
  };

  triggerSaving = async () => {
      const mol = await this.ketcher.getMolfile();
      const smiles = await this.ketcher.getSmiles();
      const multiline_mol = Buffer.from(mol).toString('base64')
      this.props.saveSketchedMoleculeChild(smiles, multiline_mol)
  }

  render() {
    return (
      <div className="ketcher_div">
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
