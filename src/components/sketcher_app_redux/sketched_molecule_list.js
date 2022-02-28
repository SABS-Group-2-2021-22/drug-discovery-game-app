import React from "react";

class SketchedMoleculeList extends React.Component {
        render() {
            return (
                <div className='sketched-molecule-list' >
                    {/* {Array.from({ length: this.props.saved_mol_list.length }, (_, i) =>
                        <MoleculeWidget
                            key={this.props.saved_mol_list[i]}
                            r_groups={this.props.saved_mol_list[i]}
                            molecule_stats={this.props.all_mol_info[this.props.saved_mol_list[i][0] + this.props.saved_mol_list[i][1]]}
                            selectMoleculeCallback={this.props.selectMoleculeCallback}
                        />)} */}
                    SketcherMoleculeList goes here
                </div>
            );
        }
    }

export default SketchedMoleculeList