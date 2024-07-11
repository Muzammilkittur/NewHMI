import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import MainPage from "./pages/mainpage";
import manualpage from "./pages/manualpage";
import SettingsPage from "./pages/settingspage";
import Diagnosticspage from "./pages/Diagnosticspage"
import AlarmsPage from "./pages/alarmspage";
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/mainpage" component={MainPage} />
        <Route exact path="/manualpage" component={manualpage} />
        <Route path="/diagnosticspage" component={Diagnosticspage} />
        <Route path="/alarmspage" component={AlarmsPage} />
        <Route path="/settingspage" component={SettingsPage} />
        {/*  */}
      </Switch>
    </Router>
  );
}

export default App;
