import React from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Requests from "./pages/requests";
import NewRequest from "./pages/new-request";
import Profile from "./pages/profile";
import styled from "styled-components";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";

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
  const { user, signOut, signInWithFacebook } = props;

  return (
    <Router>
      <div className="App">
        <NavBar
          user={user}
          signInWithFacebook={signInWithFacebook}
          signOut={signOut}
        />
        <HeaderOffset />
        <Switch>
          <ProtectedRoute
            authenticated={user != null}
            path="/requests"
            component={Requests}
          />
          <ProtectedRoute
            authenticated={user != null}
            path="/new"
            component={NewRequest}
          />
          <ProtectedRoute
            authenticated={user != null}
            path="/profile"
            component={Profile}
          />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
