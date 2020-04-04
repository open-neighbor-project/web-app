import React from "react";
import helpImg from "../img/help.jpg";
import { Link } from "react-router-dom";

import styled from "styled-components";

const StyledHome = styled.section`
  button {
    background: none !important;
    border: none;
    padding: 0 !important;
    color: #069;
    font-size: 1em;
    text-decoration: underline;
    cursor: pointer;
  }
  img {
    margin-top: 2em;
    max-width: 400px;
  }
`;

const Home = ({ user, signInWithFacebook }) =>
  console.log(signInWithFacebook) || (
    <StyledHome>
      <h1 style={{ fontSize: "3em" }}>Welcome to the Good Neighbor Project</h1>
      <br />
      <p>
        Are you a person in need that requires delivery assistance for supplies
        and groceries with no one to help out?{" "}
        <strong>You are not alone</strong>. A task force of volunteers with the
        Good Neighbor Project are on standby to offer you assistance.
      </p>
      <br />
      {user == null ? (
        <p>
          <button onClick={signInWithFacebook}>Sign in</button> to the Good
          Neighbor Project website to place a delivery assistance request.
        </p>
      ) : (
        <p>
          <Link to="/new">Place a delivery request</Link> through our web portal
          to get assistance
        </p>
      )}
      <br />
      <p>
        Don't want to make a request online? Call the helpline at 647 873 2230
      </p>
      <img src={helpImg} alt="Get help from the good neighbor project."></img>
    </StyledHome>
  );

export default Home;
