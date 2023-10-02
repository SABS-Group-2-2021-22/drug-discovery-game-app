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
View the web-app locally in your browser: `http://localhost:3000`

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
