import React from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import styled from "styled-components";

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
      \
      <div className="App">
        <StyledHeader>
          <nav>
            <h2>Open Neighbor Project</h2>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                {user ? (
                  <p>Hello, {user.displayName}</p>
                ) : (
                  <p>Please sign in.</p>
                )}
              </li>
              <li>
                {user ? (
                  <button onClick={signOut}>Sign out</button>
                ) : (
                  <div>
                    {/* <button onClick={signInWithGoogle}>Sign in with Google</button> */}
                    <button onClick={signInWithFacebook}>
                      Sign in with FB
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </nav>
        </StyledHeader>
        <HeaderOffset />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
