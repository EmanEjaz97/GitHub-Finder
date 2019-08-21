import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Components/layout/Navbar";
import Users from "./Components/users/Users";
import User from "./Components/users/User.jsx";
import Search from "./Components/users/Search";
import About from "./Components/pages/About";
import Alert from "./Components/layout/Alert";
import NotFound from "./Components/pages/NotFound";

import Axios from "axios";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(null);

  let githubClientId;
  let githubClientSecret;

  if (process.env.NODE_ENV !== "production") {
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  } else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
  }

  const searchUsers = async text => {
    setLoading(true);
    const response = await Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    setUsers(response.data.items);
    setLoading(false);
    setShow(true);
  };
  // Get single Github user
  const getUser = async username => {
    setLoading(true);
    const res = await Axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );
    setUser(res.data);
    setLoading(false);
  };

  // Clear users from screen/State
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
    setShow(false);
  };

  // Display an alert
  const setAlertMsg = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <Router>
      <div className='App'>
        <Navbar title='   GitHub Finder' />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearBtn={show}
                    clearUsers={clearUsers}
                    setAlert={setAlertMsg}
                  />
                  <Users users={users} loading={loading} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={props => (
                <User
                  {...props}
                  user={user}
                  getUser={getUser}
                  loading={loading}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
