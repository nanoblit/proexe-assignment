import React from "react";
import { Route, Switch } from "react-router";
import { Header, Main } from "./AppStyle";
import AddUser from "./components/Add User/AddUser";
import Dashboard from "./components/Dashboard/Dashboard";
import EditUser from "./components/Edit User/EditUser";
import GlobalStyle from "./styles/globalStyles";

function App() {
  return (
    <Main className="App">
      <GlobalStyle />
      <Header>Dashboard</Header>
      <Switch>
        <Route path="/add-user">
          <AddUser />
        </Route>
        <Route path="/edit-user/:id">
          <EditUser />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Main>
  );
}

export default App;
