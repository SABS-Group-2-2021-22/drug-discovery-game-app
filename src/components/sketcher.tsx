import React from "react";
import "miew/dist/miew.min.css";
import { StandaloneStructServiceProvider } from "ketcher-standalone";
import { Editor} from "ketcher-react";
import { Ketcher }  from "ketcher-core";
import "ketcher-react/dist/index.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Miew from "miew";
import { resolveTypeReferenceDirective } from "typescript";
import userEvent from "@testing-library/user-event";
const { base64encode, base64decode } = require('nodejs-base64');

(window as any).Miew = Miew;

const structServiceProvider = new StandaloneStructServiceProvider();

export class Sketcher extends React.Component {
  ketcher: Ketcher;

  constructor(props: any) {
    super(props);
    this.handleOnInit = this.handleOnInit.bind(this);
    this.logMolecule = this.logMolecule.bind(this);
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

  render() {
    return (
      <div>
        <Editor
          staticResourcesUrl={""}
          structServiceProvider={structServiceProvider}
          onInit={this.handleOnInit}
          errorHandler ={(message: string) => null}
        />
        
        <button className="sketcher_save_button" onClick={this.logMolecule}>Save Molecule</button>
      </div>
      
    );
  }
}

export default Sketcher
