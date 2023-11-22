# Drug Design Game Webapp
This is the code repository of the frontend of the drug design game web-app and app can be accessed at https://drug-design-game.onrender.com
![image](https://github.com/SABS-Group-2-2021-22/drug-discovery-game-app/assets/43485111/502aac00-0f13-4207-8fc3-d3edf96f6775)
Our game was featured in the Summer 2023 edition of the [Royal Society of Chemistry-CICAG Newsletter](http://www.rsccicag.org/index_htm_files/CICAG%20Newsletter%20Summer%202023%20FINAL.pdf)
## A brief introduction to the game
* Our game is meant to be an educational tool which gamifies the process of designing drugs ​
* Our target users are junior medicinal chemists  ​
* The goal of the game is to produce an inhibitor to MMP-12 which matches the target compound profile (TCP)​​
  
## Installation and run instructions
The frontend relies on the [backend](https://github.com/SABS-Group-2-2021-22/drug-discovery-game-backend), the instructions include how to run the backend. 
### Prerequisites

You must have node and npm installed for the frontend server: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)


For Linux with apt package manager:
```
sudo apt install nodejs
sudo apt install npm
```

For OSX:
* with homebrew: `brew install node`
* from [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

For Windows:
* from [https://nodejs.org/en/download/](https://nodejs.org/en/download/)



### Backend
Running the backend (this assumes dependencies are already installed in a conda environment called `dd_game`, the backend repository for installation instructions)
```
cd drug-discovery-game-backend
conda activate dd_game
export FLASK_APP=api/service
flask run
```
### Frontend
Do this in a separate terminal tab or window. 

Install the dependencies: 
```
cd drug-discovery-game-app
npm install
```
Run the web-app server:
```
npm start
```


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

# Docking Feature
We are excited to introduce the new "Docking" feature to our app. With this feature, users can now explore docking poses and affinity scores of ligands and proteins.

## How it Works
AutoDock Integration: Initially, we utilize AutoDock to calculate the docking pose and the affinity score of the ligand and the protein for all ligands in our database.

Data Documentation: Once the calculations are complete, we document and store the docking results for future reference and retrieval.

MolStar Viewer: To visually represent the docking poses, we have integrated the MolStar viewer into our application. This feature allows users to view the molecular structures directly within our platform.
## MolStar Viewer Interface
The MolStar viewer is seamlessly integrated into our user interface, offering a holistic view of the molecular structures.

3D Canvas: This is where the PDB structure is displayed, offering a three-dimensional perspective. It's prominently located on the left side of the screen.

Docking Data: Alongside the molecular visualization, users can see the affinity score derived from the docking process, providing a comprehensive understanding of the ligand-protein interaction.

Navigation: Users can navigate to different sections of the app, such as the assay or analysis views, directly from the Docking interface.

Updated Mouse Controls for MolStar
In the Docking view, users can interact with the displayed molecule using mouse controls. These controls allow for manipulation of the molecular structures, such as rotating, translating, zooming, and more.

Rotate: Click and drag using the left mouse button. Alternatively, hold the Shift key and drag with the left mouse button.

Translate: Click and drag with the right mouse button. Or, use the Control key with the left mouse button. For touchscreen devices, a two-finger drag works.

Zoom: Use the mouse wheel or a two-finger drag on touchpads and touchscreen devices.

Center and Zoom: Click on a specific part of the structure with the right mouse button to focus on it.

Clip: Adjust the clipping planes using the Shift key combined with the mouse wheel or a two-finger drag on touchpads.

By hovering over any part of the 3D structure, it gets highlighted, and detailed information is shown in the lower right corner of the 3D canvas. This includes the PDB ID, model number, instance, chain ID, residue number, and chain name.
