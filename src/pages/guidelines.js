import React from "react";
import InNeedGuidelines from "../components/InNeedGuidelines";
import VolunteerGuidelines from "../components/VolunteerGuidlines";
import DonationGuidelines from "../components/DontationGuidelines";
import styled from "styled-components";

const StyledGuidelines = styled.section`
  h1 {
    font-size: 2em;
  }
  padding-bottom: 3em;
`;

const Guidelines = ({}) => (
  <StyledGuidelines>
    <h1>Guidelines and FAQ</h1>
    <InNeedGuidelines />
    <br />
    <VolunteerGuidelines />
    <br />
    <DonationGuidelines />
  </StyledGuidelines>
);

export default Guidelines;
