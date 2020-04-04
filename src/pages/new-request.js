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
} from "carbon-components-react";
import { TrashCan16 } from "@carbon/icons-react";
import { Formik, FieldArray } from "formik";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  padding: 2em;
  margin: auto;
`;

const NewRequest = () => {
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
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
      setHasSubmitted(true);
    }, 800);
  }

  return (
    <Container>
      <h1>Submit a new request</h1>
      <br />
      <Formik
        initialValues={{
          title: "",
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
            <FieldArray name="tasks">
              {({ push, remove }) => (
                <div>
                  <div style={{ marginBottom: "2em" }}>
                    <div style={{ display: "inline-block", width: "80%" }}>
                      <TextInput
                        id="taskItem"
                        name="taskItem"
                        labelText="Task item"
                        placeholder="Enter a task"
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
                        Add task
                      </Button>
                    </div>
                  </div>
                  <div style={{ marginBottom: "2em" }}>
                    {tasksError ? (
                      <InlineNotification
                        kind="error"
                        lowContrast
                        title=""
                        subtitle="There must be at least one task"
                      />
                    ) : null}
                    <FormLabel>Tasks</FormLabel>
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
                        <p>No tasks added</p>
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
            {isSubmitting || hasSubmitted ? (
              <InlineLoading
                success={hasSubmitted}
                icondescription="Active loading indicator"
                description={
                  hasSubmitted ? "Submission successful" : "Submitting data..."
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
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default NewRequest;
