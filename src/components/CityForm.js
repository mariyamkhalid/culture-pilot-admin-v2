import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import { createNewCity } from "../Utils";
import { Auth } from "aws-amplify";

export default function CityForm() {
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [cityName, setCityName] = useState("");
  const [cityIntro, setCityIntro] = useState("");
  const [cityLatitude, setCityLatitude] = useState();
  const [cityLongitude, setCityLongitude] = useState("");
  const [fileName, setFileName] = useState("");
  const [validated, setValidated] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeCityImage = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };
  const changeCityName = (event) => {
    setCityName(event.target.value);
  };
  const changeCityIntro = (event) => {
    setCityIntro(event.target.value);
  };
  const changeCityLatitude = (event) => {
    setCityLatitude(event.target.value);
  };
  const changeCityLongitude = (event) => {
    setCityLongitude(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    const user = await Auth.currentAuthenticatedUser();
    await createNewCity(
      user.signInUserSession.idToken.jwtToken,
      selectedFile,
      fileName,
      cityName,
      cityIntro,
      cityLatitude,
      cityLongitude
    )
      .then(setShow(false))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add City
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new city</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} md="20" controlId="validationCustom01">
              <Form.Label>City Name</Form.Label>
              <Form.Control
                required
                type="text"
                maxLength={200}
                onChange={changeCityName}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom02">
              <Form.Label>City Intro</Form.Label>
              <Form.Control
                type="text"
                maxLength={1200}
                required
                onChange={changeCityIntro}
              />
              <Form.Text> Limited to 120 chars</Form.Text>
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom03">
              <Form.Label>City Latitude</Form.Label>
              <Form.Control
                type="number"
                step="0.000000000000001"
                maxLength={120}
                required
                onChange={changeCityLatitude}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom04">
              <Form.Label>City Longitude</Form.Label>
              <Form.Control
                type="number"
                step="0.000000000000001"
                maxLength={120}
                required
                onChange={changeCityLongitude}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom05">
              <Form.Label>City Image</Form.Label>
              <Form.Control
                type="file"
                maxLength={120}
                required
                accept=".png"
                onChange={changeCityImage}
              />
            </Form.Group>

            <Button type="submit">Create City</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
