import React, { useState, useEffect } from "react";
import {
  StructuredListWrapper,
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListRow,
  Button,
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

  function loadRequests() {
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
  }

  useEffect(() => {
    loadRequests();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <section>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>Requests</h1>
        <Button kind="secondary" onClick={loadRequests}>
          Refresh
        </Button>
      </div>
      <StructuredListWrapper>
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>ID</StructuredListCell>
            <StructuredListCell head>Status</StructuredListCell>
            <StructuredListCell head>Overview</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {requests.map((request) => (
            <RequestRow
              id={request.orderId}
              status={request.status}
              description={request.title}
            />
          ))}
        </StructuredListBody>
      </StructuredListWrapper>
    </section>
  );
};

export default Requests;
