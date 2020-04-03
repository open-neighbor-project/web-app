import React from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Requests from "./pages/requests";
import styled from "styled-components";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from './components/NavBar';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.headerBackground};
  z-index: 100;
  ul {
    display: flex;
    li:not(:first-child) {
      margin-left: 2em;
    }
  }
  nav {
    padding: 1.5em;
    display: flex;
    max-width: ${({ theme }) => theme.maxContentWidth};
    margin: auto;
    justify-content: space-between;
    align-items: center;
  }
  @media screen and (max-width: 700px) {
    .header-title {
      display: none;
    }
    nav {
      justify-content: space-around;
    }
  }
`;

const HeaderOffset = styled.div`
  margin-top: 6em;
`;

const providers = {
  // googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
};

function App(props) {
  const { user, signOut, signInWithGoogle, signInWithFacebook } = props;

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
          <Route path="/about" component={About} />
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
