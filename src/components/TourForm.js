import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { createNewTour } from "../Utils";
import { Auth } from "aws-amplify";

export default function TourForm(props) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const [validated, setValidated] = useState(false);
  const handleClose = () => setShow(false);

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
    await createNewTour(
      user.signInUserSession.idToken.jwtToken,
      selectedFile,
      fileName,
      tourName,
      tourDesc,
      tourLatitude,
      tourLongitude,
      hasAudio,
      isOutdoors,
      props.orgId
    )
      .then(setShow(false))
      .catch((error) => {
        console.error(error);
      });
  };

  const [tourName, setTourName] = useState("");
  const changeTourName = (event) => {
    setTourName(event.target.value);
  };

  const [hasAudio, setHasAudio] = useState(false);
  const changeHasAudio = (event) => {
    console.log(event.target.checked);
    setHasAudio(event.target.checked);
  };

  const [isOutdoors, setIsOutdoors] = useState(false);
  const changeIsOutdoors = (event) => {
    setIsOutdoors(event.target.checked);
  };
  const [tourDesc, setTourDesc] = useState("");
  const changeTourDesc = (event) => {
    setTourDesc(event.target.value);
  };

  const [tourLatitude, setTourLatitude] = useState("");
  const changeTourLatitude = (event) => {
    setTourLatitude(event.target.value);
  };
  const [tourLongitude, setTourLongitude] = useState("");
  const changeTourLongitude = (event) => {
    setTourLongitude(event.target.value);
  };

  const changeTourImage = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Tour
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} md="20" controlId="validationCustom00">
              <Form.Label>Tour Name</Form.Label>
              <Form.Control
                required
                type="text"
                maxLength={200}
                onChange={changeTourName}
              />
            </Form.Group>
            <Form.Group controlId="validationCustom01">
              <Form.Check
                type="checkbox"
                label="Has Audio"
                onClick={changeHasAudio}
              />
            </Form.Group>
            <Form.Group controlId="validationCustom02">
              <Form.Check
                type="checkbox"
                label="Is Outdoors"
                onClick={changeIsOutdoors}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom03">
              <Form.Label>Tour Description</Form.Label>
              <Form.Control
                type="text"
                maxLength={1200}
                required
                onChange={changeTourDesc}
              />
              <Form.Text> Limited to 120 chars</Form.Text>
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom04">
              <Form.Label>Tour Latitude</Form.Label>
              <Form.Control
                type="number"
                step="0.000000000000001"
                maxLength={120}
                onChange={changeTourLatitude}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom05">
              <Form.Label>Tour Longitude</Form.Label>
              <Form.Control
                type="number"
                step="0.000000000000001"
                maxLength={120}
                onChange={changeTourLongitude}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom05">
              <Form.Label>Tour Image</Form.Label>
              <Form.Control
                type="file"
                maxLength={120}
                required
                accept=".png"
                onChange={changeTourImage}
              />
            </Form.Group>

            <Button type="submit">Create Tour</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
