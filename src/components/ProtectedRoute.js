import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ user, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (user === undefined) {
        return null; // undefined user means still loading
      } else if (user === null) {
        return <Redirect to="/" />; // null means loaded and not signed in
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

export default PrivateRoute;
