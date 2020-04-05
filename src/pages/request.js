import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as RequestService from "../services/requests";
import {
  ProgressIndicator,
  ProgressStep,
  Button,
} from "carbon-components-react";

const status = [
  "CREATED",
  "PENDING_ASSIGNMENT",
  "ASSIGNED",
  "IN_PROGRESS",
  "DELIVERED",
  "PAYMENT_RECEIVED",
  "CLOSED",
];

const Request = () => {
  let { id } = useParams();

  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(false);

  function loadRequest(id) {
    setLoading(true);
    RequestService.getRequestById(id)
      .then((request) => {
        console.log(request);
        setRequest(request);
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
    loadRequest(id);
  }, [id]);

  if (loading) {
    return null;
  }

  console.log(status.indexOf(request.status));

  return (
    <section>
      <h2>
        {request.title} | Order #{id}
      </h2>
      <br />
      <p>
        <strong>Volunteer assigned:</strong>{" "}
        {request.assignedVolunteerId == null ? "No" : "Yes"}
      </p>
      <br />
      <p>
        <strong>Items:</strong>
      </p>
      <ul>
        {request &&
          request.itemList &&
          request.itemList.map((item) => <li>- {item}</li>)}
      </ul>
      <br />
      <p>
        <strong>Budget:</strong> ${request.budget}
      </p>
      <br />
      <p>
        <strong>Preferred store:</strong> {request.preferredStore}
      </p>
      <br />
      <p>
        <strong>Additional details</strong>
      </p>
      <p>{request.additionalInfo}</p>
      <br />
      <h5>Order status</h5>
      <br />
      <ProgressIndicator currentIndex={status.indexOf(request.status) || 0}>
        <ProgressStep
          description="Step 1: Getting started with Carbon Design System"
          label="Created"
        />
        <ProgressStep
          style={{ width: "100%" }}
          description="Step 2: Getting started with Carbon Design System"
          label="Unassigned"
        />
        <ProgressStep
          description="Step 3: Getting started with Carbon Design System"
          label="Assigned"
        />
        <ProgressStep
          description="Step 4: Getting started with Carbon Design System"
          label="In progress"
        />
        <ProgressStep
          description="Step 5: Getting started with Carbon Design System"
          label="Delivered"
        />
        <ProgressStep
          description="Step 6: Getting started with Carbon Design System"
          label="Payment"
        />
        <ProgressStep
          description="Step 7: Getting started with Carbon Design System"
          label="Completed"
        />
      </ProgressIndicator>
      <br />
      <br />
      <Button style={{ marginRight: "1em" }} kind="danger">
        Cancel Request
      </Button>
      <Button
        style={{ marginRight: "1em" }}
        kind="secondary"
        disabled={request.assignedVolunteerId == null}
      >
        Contact volunteer
      </Button>
      <Button kind="secondary" disabled>
        View receipt
      </Button>
    </section>
  );
};

export default Request;
