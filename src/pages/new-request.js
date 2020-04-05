import React, { useState } from "react";
import {
  Button,
  Form,
  FormLabel,
  TextInput,
  TextArea,
  OrderedList,
  ListItem,
  InlineLoading,
  InlineNotification,
  NumberInput,
} from "carbon-components-react";
import { TrashCan16 } from "@carbon/icons-react";
import { Formik, FieldArray } from "formik";
import styled from "styled-components";
import UserContext from "../utils/UserContext";
import * as RequestService from "../services/requests";

const Container = styled.div`
  max-width: 800px;
  margin: auto;

  .bx--label {
    font-size: 1em;
  }
`;

const NewRequest = () => {
  const user = React.useContext(UserContext);

  function validationHandler({ title, tasks }) {
    let errors = {};

    if (!title) {
      errors.title = "Title cannot be empty";
    }
    if (tasks.length === 0) {
      errors.task = "There must be at least one task";
    }

    return errors;
  }

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [task, setTask] = useState("");
  const [tasksError, setTasksError] = useState(false);

  function submissionHandler(values, { setSubmitting }) {
    const request = {
      email: user.email,
      title: values.title,
      preferredStore: values.preferredStore,
      budget: values.budget,
      itemList: values.tasks,
      additionalInfo: values.additionalInfo,
    };

    RequestService.createRequest(request)
      .then(() => {
        // todo
      })
      .catch(() => {
        // todo
      })
      .finally(() => {
        setSubmitting(false);
        setHasSubmitted(true);
      });
  }

  return (
    <Container>
      <h1>Submit a new request</h1>
      <p>
        If you, or someone you know, would benefit from assistance, please fill
        out the new request form in order for us to route your request to one of
        our available volunteers.
      </p>
      <br />
      <br />
      <Formik
        initialValues={{
          title: "",
          preferredStore: "",
          budget: 5,
          tasks: [],
          additionalInfo: "",
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
                id="title"
                name="title"
                labelText="Request Title"
                placeholder="Enter a title"
                value={values.title}
                invalidText={errors.title}
                invalid={Boolean(touched.title && errors.title)}
                disabled={hasSubmitted}
              />
            </div>
            <div style={{ marginBottom: "2em" }}>
              <TextInput
                id="preferredStore"
                name="preferredStore"
                labelText="Preferred Store"
                placeholder="Enter your preferred store"
                value={values.preferredStore}
                invalidText={errors.preferredStore}
                invalid={Boolean(
                  touched.preferredStore && errors.preferredStore
                )}
                disabled={hasSubmitted}
              />
            </div>
            <div style={{ marginBottom: "2em" }}>
              <NumberInput
                id="budget"
                name="budget"
                label="Budget ($)"
                placeholder="Enter a budget"
                min="0"
                value={values.budget}
                invalidText="Budget cannot be negative"
                disabled={hasSubmitted}
              />
            </div>
            <FieldArray name="tasks">
              {({ push, remove }) => (
                <div>
                  <div style={{ marginBottom: "2em" }}>
                    <div style={{ display: "inline-block", width: "80%" }}>
                      <TextInput
                        id="taskItem"
                        name="taskItem"
                        labelText="Add a request item"
                        placeholder="Enter a request item"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        disabled={hasSubmitted}
                      />
                    </div>
                    <div style={{ display: "inline-block", width: "20%" }}>
                      <Button
                        size="field"
                        disabled={hasSubmitted}
                        onClick={() => {
                          if (task.length > 0) {
                            push(task);
                            setTask("");
                            setTasksError(false);
                          }
                        }}
                        style={{ width: "100%", marginTop: "25px" }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                  <div style={{ marginBottom: "2em" }}>
                    {tasksError ? (
                      <InlineNotification
                        kind="error"
                        lowContrast
                        title=""
                        subtitle="There must be at least one request item"
                      />
                    ) : null}
                    <FormLabel>Request items</FormLabel>
                    <OrderedList>
                      {values.tasks.length > 0 ? (
                        values.tasks.map((p, index) => (
                          <ListItem>
                            {values.tasks[index]}{" "}
                            {!isSubmitting && !hasSubmitted ? (
                              <TrashCan16 onClick={() => remove(index)} />
                            ) : null}
                          </ListItem>
                        ))
                      ) : (
                        <p>No request items added</p>
                      )}
                    </OrderedList>
                  </div>
                </div>
              )}
            </FieldArray>
            <div style={{ marginBottom: "2em" }}>
              <TextArea
                id="additional-info"
                name="additionalInfo"
                labelText="Additional info"
                placeholder="Enter any additional info"
                value={values.additionalInfo}
                invalidText={errors.additionalInfo}
                invalid={Boolean(
                  touched.additionalInfo && errors.additionalInfo
                )}
                disabled={hasSubmitted}
              />
            </div>
            <div style={{ marginBottom: "2em" }}>
              {isSubmitting || hasSubmitted ? (
                <InlineLoading
                  success={hasSubmitted}
                  icondescription="Active loading indicator"
                  description={
                    hasSubmitted
                      ? "Submission successful"
                      : "Submitting data..."
                  }
                />
              ) : (
                <Button
                  type="submit"
                  onClick={() => {
                    if (values.tasks.length === 0) {
                      setTasksError(true);
                    }
                  }}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default NewRequest;
