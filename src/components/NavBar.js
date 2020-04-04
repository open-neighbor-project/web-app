import React, { useState } from "react";
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderPanel,
  Switcher,
  SwitcherItem,
} from "carbon-components-react";
import { UserAvatar32 } from "@carbon/icons-react";
import { withRouter } from "react-router-dom";

function navigate(newPath, history) {
  let path = document.location.pathname;
  if (newPath !== path) {
    history.push(newPath);
  }
}

const NavBar = (props) => {
  const { user, signInWithFacebook, signOut, history } = props;
  console.log(user);
  const [expanded, setExpanded] = useState(false);

  return (
    <Header>
      <HeaderName prefix="">Open Neighbor Project</HeaderName>
      <HeaderNavigation>
        <HeaderMenuItem onClick={() => navigate("/", history)}>
          Home
        </HeaderMenuItem>
        {user ? (
          <HeaderMenuItem onClick={() => navigate("/requests", history)}>
            Requests
          </HeaderMenuItem>
        ) : null}
        {user ? (
          <HeaderMenuItem onClick={() => navigate("/new", history)}>
            Submit a request
          </HeaderMenuItem>
        ) : null}
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction onClick={() => setExpanded(!expanded)}>
          {user ? (
            <img
              src={user.photoURL}
              height="32px"
              width="32px"
              alt="profile"
              style={{ borderRadius: "32px" }}
            />
          ) : (
            <UserAvatar32 />
          )}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
      <HeaderPanel expanded={expanded}>
        <Switcher>
          {user ? (
            <>
              <SwitcherItem
                onClick={() => {
                  navigate("/profile", history);
                  setExpanded(!expanded);
                }}
              >
                Edit profile
              </SwitcherItem>
              <SwitcherItem
                onClick={() => {
                  setExpanded(!expanded);
                  signOut();
                }}
              >
                Sign out
              </SwitcherItem>
            </>
          ) : (
            <SwitcherItem
              onClick={() => {
                setExpanded(!expanded);
                signInWithFacebook();
              }}
            >
              Sign in with Facebook
            </SwitcherItem>
          )}
        </Switcher>
      </HeaderPanel>
    </Header>
  );
};

export default withRouter(NavBar);
