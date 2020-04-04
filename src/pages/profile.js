import React, { useState } from "react";
import { Formik } from "formik";
import styled from "styled-components";
import {
  Form,
  TextInput,
  Button,
  InlineLoading,
  Select,
  SelectItem,
} from "carbon-components-react";

const Container = styled.div`
  max-width: 800px;
  padding: 2em;
  margin: auto;
`;

function ProfileForm({ user }) {
  function validationHandler({ address, phone }) {
    let errors = {};

    if (!address) {
      errors.address = "Required";
    }
    if (!phone) {
      errors.phone = "Required";
    }

    return errors;
  }

  const [hasSubmitted, setHasSubmitted] = useState(false);

  function submissionHandler(values, { setSubmitting }) {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      setHasSubmitted(true);
    }, 1200);
  }

  return (
    <Formik
      initialValues={{
        type: "requestor",
        address: "",
        phone: "",
      }}
      validate={validationHandler}
      onSubmit={submissionHandler}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form
          onSubmit={handleSubmit}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <div style={{ marginBottom: "2em" }}>
            <Select
              labelText="What brings you to the good neighbor project?"
              id="type"
              name="type"
              value={values.type}
              disabled={hasSubmitted}
            >
              <SelectItem value="requestor" text="I require assistance" />
              <SelectItem value="volunteer" text="I would like to volunteer" />
              <SelectItem value="operator" text="I am a hotline operator" />
            </Select>
          </div>
          <div style={{ marginBottom: "2em" }}>
            <TextInput
              id="address"
              name="address"
              labelText="Address"
              placeholder="Enter an address"
              value={values.address}
              invalidText={errors.address}
              invalid={Boolean(touched.address && errors.address)}
              disabled={hasSubmitted}
            />
          </div>
          <div style={{ marginBottom: "2em" }}>
            <TextInput
              id="phone"
              name="phone"
              labelText="Phone number"
              placeholder="Enter your phone number"
              value={values.phone}
              invalidText={errors.phone}
              invalid={Boolean(touched.phone && errors.phone)}
              disabled={hasSubmitted}
            />
          </div>
          {isSubmitting || hasSubmitted ? (
            <InlineLoading
              success={hasSubmitted}
              icondescription="Active loading indicator"
              description={
                hasSubmitted ? "Submission successful" : "Submitting data..."
              }
            />
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
}

function Profile({ user }) {
  return (
    <Container>
      <h1 style={{ float: "left" }}>Edit your profile</h1>
      <br />
      {/* TODO: Improve this */}
      <Button
        style={{ float: "right" }}
        kind="secondary"
        onClick={() => window.location.reload()}
      >
        Reset form
      </Button>
      <br />
      <br />
      <p>Welcome {user.displayName}</p>
      <br />
      <ProfileForm />
    </Container>
  );
}

export default Profile;
