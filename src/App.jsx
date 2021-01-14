import react, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import List from "./pages/list.jsx";
import RecoilRootStore from "./Recoil/root";

export default function App() {
  return (
    <RecoilRootStore>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/list" component={List} />
        </Switch>
      </Router>
    </RecoilRootStore>
  );
}
