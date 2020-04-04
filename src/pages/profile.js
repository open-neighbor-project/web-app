import React, { useState } from "react";
import { Formik } from "formik";
import styled from "styled-components";
import {
  Form,
  TextInput,
  Button,
  InlineLoading,
} from "carbon-components-react";

const Container = styled.div`
  max-width: 800px;
  padding: 2em;
  margin: auto;
`;

function Profile() {
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
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
      setHasSubmitted(true);
    }, 800);
  }

  return (
    <Container>
      <h1>Edit your profile</h1>
      <br />
      <Formik
        initialValues={{
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
    </Container>
  );
}

export default Profile;
