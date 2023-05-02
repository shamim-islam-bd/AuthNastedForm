import React from "react";
import { Alert } from "react-bootstrap";

function SuccessMessage(props) {
  // console.log(props);
  const { onClose, data } = props;
  return (
    <Alert variant="success" onClose={onClose} dismissible>
      <Alert.Heading>Success!</Alert.Heading>
      <p className="text-success">{data}</p>
    </Alert>
  );
}

function ErrorMessage(props) {
  // console.log(props);
  const { onClose, data } = props;
  return (
    <Alert variant="success" onClose={onClose} dismissible>
      <Alert.Heading>Success!</Alert.Heading>
      <p className="text-success">{data}</p>
    </Alert>
  );
}

export { ErrorMessage, SuccessMessage };
