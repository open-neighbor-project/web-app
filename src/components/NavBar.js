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
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const { user, signInWithFacebook, signOut } = props;
  console.log(user);
  const [expanded, setExpanded] = useState(false);

  return (
    <Header>
      <HeaderName prefix="">Open Neighbor Project</HeaderName>
      <HeaderNavigation>
        <HeaderMenuItem>
          <Link to="/">Home</Link>
        </HeaderMenuItem>
        <HeaderMenuItem>
          <Link to="/about">About</Link>
        </HeaderMenuItem>
        {user ? (
          <HeaderMenuItem>
            <Link to="/requests">Requests</Link>
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
            <SwitcherItem
              onClick={() => {
                setExpanded(!expanded);
                signOut();
              }}
            >
              Sign out
            </SwitcherItem>
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

export default NavBar;
