import React from "react";
import { Button } from "carbon-components-react";
import styled from "styled-components";

const StyledHelpline = styled.section`
  div {
    display: flex;
    justify-content: space-between;
  }

  button {
    width: 100%;
    max-width: 200px;
  }
`;

const Helpline = () => (
  <StyledHelpline>
    <h1>Helpline Operator Portal</h1>
    <br />
    <div>
      <Button>Create a profile</Button>
      <br />
      <br />
      <Button>Create a request</Button>
      <br />
      <br />
      <Button>View profile</Button>
      <br />
      <br />
      <Button>View requests</Button>
    </div>
  </StyledHelpline>
);
export default Helpline;
