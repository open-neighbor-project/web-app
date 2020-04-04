import React from "react";
import img from "../img/good-neighbor-project.jpg";
import styled from "styled-components";

const StyledHome = styled.section`
  img {
    margin-top: 2em;
    max-width: 400px;
  }
`;

const Home = () => (
  <StyledHome>
    <h1>
      Welcome to the Good neighbor project <span role="img">👋</span>
    </h1>
    <br />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <br />
    <p>
      Don't want to make a request online? Call the helpline at 647 873 2230
    </p>
    <img src={img}></img>
  </StyledHome>
);

export default Home;
