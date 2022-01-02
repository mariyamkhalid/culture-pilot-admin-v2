import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default function EditCityForm(props) {
  const [cityName, setCityName] = useState(props.cityName);
  const [validated, setValidated] = useState(false);
  const handleSubmit = async (event) => {};
  const changeCityName = (event) => {
    setCityName(event.target.value);
  };

  return (
    <>
      <Modal show={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} md="20" controlId="validationCustom01">
              <Form.Label>City Name</Form.Label>
              <Form.Control
                required
                type="text"
                maxLength={20}
                onChange={changeCityName}
                defaultValue={cityName}
              />
            </Form.Group>
            <Button type="submit">Update City</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
