import React, { useState, useEffect } from "react";
import {
  StructuredListWrapper,
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListRow,
} from "carbon-components-react";
import { withRouter } from "react-router-dom";
import * as RequestService from "../services/requests";

function navigate(newPath, history) {
  let path = document.location.pathname;
  if (newPath !== path) {
    history.push(newPath);
  }
}

const RequestRow = withRouter(({ history, id, status, description }) => {
  return (
    <StructuredListRow
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/requests/${id}`, history)}
    >
      <StructuredListCell noWrap>{id}</StructuredListCell>
      <StructuredListCell noWrap>{status}</StructuredListCell>
      <StructuredListCell>{description}</StructuredListCell>
    </StructuredListRow>
  );
});

const Requests = ({ history }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    RequestService.getAllRequests()
      .then((requests) => {
        setRequests(requests);
        setLoading(false);
      })
      .catch(() => {
        // TODO
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <section>
      <h1>Requests</h1>
      <StructuredListWrapper>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>ID</StructuredListCell>
            <StructuredListCell head>Status</StructuredListCell>
            <StructuredListCell head>Overview</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          <RequestRow
            id={1}
            status="Unassigned"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean
            posuere sem vel euismod dignissim. Nulla ut cursus dolor.
            Pellentesque vulputate nisl a porttitor interdum."
          />
          <RequestRow
            id={2}
            status="In progress"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
            magna, finibus id tortor sed, aliquet bibendum augue. Aenean
            posuere sem vel euismod dignissim. Nulla ut cursus dolor.
            Pellentesque vulputate nisl a porttitor interdum."
          />
        </StructuredListBody>
      </StructuredListWrapper>
    </section>
  );
};

export default Requests;
