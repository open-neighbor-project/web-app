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
import styled from "styled-components";
import UserContext from "../utils/UserContext";

const MobileOnlySwitcher = styled(Switcher)`
  display: none;
  @media (max-width: 66rem) {
    display: block;
  }
`;

function navigate(newPath, history) {
  let path = document.location.pathname;
  if (newPath !== path) {
    history.push(newPath);
  }
}

const NavBar = (props) => {
  const { signInWithFacebook, signOut, history } = props;

  const user = React.useContext(UserContext);
  
  const [expanded, setExpanded] = useState(false);

  return (
    <Header>
      <HeaderName prefix="">Good Neighbor Project</HeaderName>
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
        <MobileOnlySwitcher>
          <SwitcherItem
            onClick={() => {
              navigate("/", history);
              setExpanded(false);
            }}
          >
            Home
          </SwitcherItem>
          {user ? (
            <SwitcherItem
              onClick={() => {
                navigate("/requests", history);
                setExpanded(false);
              }}
            >
              Requests
            </SwitcherItem>
          ) : null}
          {user ? (
            <SwitcherItem
              onClick={() => {
                navigate("/new", history);
                setExpanded(false);
              }}
            >
              Submit a request
            </SwitcherItem>
          ) : null}
        </MobileOnlySwitcher>
        <Switcher>
          {user ? (
            <>
              <SwitcherItem
                onClick={() => {
                  navigate("/profile", history);
                  setExpanded(false);
                }}
              >
                Edit profile
              </SwitcherItem>
              <SwitcherItem
                onClick={() => {
                  setExpanded(false);
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
