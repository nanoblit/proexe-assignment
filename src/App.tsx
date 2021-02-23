import React from "react";
import { Route, Switch } from "react-router";
import AddUser from "./components/Add User/AddUser";
import Dashboard from "./components/Dashboard/Dashboard";
import GlobalStyle from "./styles/globalStyles";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <h1>Dashboard</h1>
      <Switch>
        <Route path="/add-user">
          <AddUser />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
