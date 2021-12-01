import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";

// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Home,
  App,
} from "./components";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<App />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);

// serviceWorker.unregister();
