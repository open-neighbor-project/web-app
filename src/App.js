import React from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Requests from "./pages/requests";
import Request from "./pages/request";
import NewRequest from "./pages/new-request";
import Guidelines from "./pages/guidelines";
import Profile from "./pages/profile";
import styled from "styled-components";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import UserContext from "./utils/UserContext";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

const HeaderOffset = styled.div`
  margin-top: 6em;
`;

const providers = {
  // googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
};

function App(props) {
  const { user, signOut, signInWithFacebook, loading } = props;

  return (
    <UserContext.Provider value={user}>
      <Router>
        <div className="App">
          <NavBar signInWithFacebook={signInWithFacebook} signOut={signOut} />
          <HeaderOffset />
          <Switch>
            <ProtectedRoute
              user={user}
              path="/requests"
              exact
              component={Requests}
            />
            <ProtectedRoute
              user={user}
              path="/requests/:id"
              component={Request}
            />
            <ProtectedRoute user={user} path="/new" component={NewRequest} />
            <ProtectedRoute user={user} path="/profile" component={Profile} />
            <Route path="/faq" component={Guidelines} />
            <Route
              path="/"
              component={() => (
                <Home user={user} signInWithFacebook={signInWithFacebook} />
              )}
            />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
