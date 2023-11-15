
// A helper function to compile game data for clean code usage
export function compile_game_data(saved_mols, money, time, selected_mol){
    let molecule_info = {}
    Object.keys(saved_mols).map(mol_key => {
      molecule_info[mol_key] = {
        "keys": [mol_key.slice(0, 3), mol_key.slice(3, 6)],
        "descriptors": saved_mols[mol_key].data.descriptors,
        "lipinski": saved_mols[mol_key].data.lipinski,
        "assays_run": saved_mols[mol_key].data.assays_run,
        "date_created": saved_mols[mol_key].date_created
      }
    })

    let game_data = {
      "money": money,
      "time": time,
      "chosen_mol": [selected_mol.slice(0, 3), selected_mol.slice(3, 6)],
      "molecule_info": molecule_info
    }
    return game_data
  }
  
  // Export the helper function for use in other files
//   export {compile_game_data};
  

