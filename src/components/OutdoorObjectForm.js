import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import { createNewOutdoorObject } from "../Utils";
import { Auth } from "aws-amplify";

export default function OutdoorObjectForm(props) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedImageFile, setSelectedImageFile] = useState();
  const [imageFileName, setImageFileName] = useState("");
  // const [selectedAudioFile, setSelectedAudioFile] = useState();
  // const [audioFileName, setAudioFileName] = useState("");

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
    await createNewOutdoorObject(
      user.signInUserSession.idToken.jwtToken,
      selectedImageFile,
      imageFileName,
      // selectedAudioFile,
      // audioFileName,
      objectName,
      objectDetails,
      objectLatitude,
      objectLongitude,
      props.city,
      props.tourId
    )
      .then(setShow(false))
      .catch((error) => {
        console.error(error);
      });
  };

  const [objectName, setObjectName] = useState("");
  const changeObjectName = (event) => {
    setObjectName(event.target.value);
  };

  const [objectDetails, setObjectDetails] = useState("");
  const changeObjectDetails = (event) => {
    setObjectDetails(event.target.value);
  };

  const [objectLatitude, setObjectLatitude] = useState("");
  const changeObjectLatitude = (event) => {
    setObjectLatitude(event.target.value);
  };

  const [objectLongitude, setObjectLongitude] = useState("");
  const changeObjectLongitude = (event) => {
    setObjectLongitude(event.target.value);
  };

  const changeObjectImage = (event) => {
    setSelectedImageFile(event.target.files[0]);
    setImageFileName(event.target.files[0].name);
  };

  // const changeObjectAudio = (event) => {
  //   setSelectedAudioFile(event.target.files[0]);
  //   setAudioFileName(event.target.files[0].name);
  // };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Object
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new object</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} md="20" controlId="validationCustom01">
              <Form.Label>Object Name</Form.Label>
              <Form.Control
                required
                type="text"
                maxLength={200}
                onChange={changeObjectName}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom02">
              <Form.Label>Object Details</Form.Label>
              <Form.Control
                type="text"
                maxLength={5000}
                required
                onChange={changeObjectDetails}
              />
              <Form.Text> Limited to 500 chars</Form.Text>
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom03">
              <Form.Label>Object Latitude</Form.Label>
              <Form.Control
                type="number"
                step="0.00000000000000001"
                maxLength={120}
                required
                onChange={changeObjectLatitude}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom04">
              <Form.Label>Object Longitude</Form.Label>
              <Form.Control
                type="number"
                step="0.00000000000000001"
                maxLength={120}
                required
                onChange={changeObjectLongitude}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom05">
              <Form.Label>Object Image</Form.Label>
              <Form.Control
                type="file"
                maxLength={1200}
                required
                accept=".png"
                onChange={changeObjectImage}
              />
            </Form.Group>
            {/* <Form.Group as={Col} md="20" controlId="validationCustom06">
              <Form.Label>Object Audio</Form.Label>
              <Form.Control
                type="file"
                maxLength={120}
                accept=".mp3"
                onChange={changeObjectAudio}
              />
            </Form.Group> */}
            <Button type="submit">Create Object</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
