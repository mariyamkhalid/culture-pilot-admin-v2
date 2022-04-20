import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { createNewOrg } from "../Utils";
import { Auth } from "aws-amplify";

export default function OrgForm(props) {
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const [validated, setValidated] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [orgName, setOrgName] = useState("");
  const changeOrgName = (event) => {
    console.log(event.target.value);
    setOrgName(event.target.value);
  };

  const [orgPhysical, setOrgPhysical] = useState(false);
  const changeOrgPhysical = (event) => {
    console.log(event.target.checked);
    setOrgPhysical(event.target.checked);
  };
  const [orgDesc, setOrgDesc] = useState("");
  const changeOrgDesc = (event) => {
    setOrgDesc(event.target.value);
  };
  const [orgLatitude, setOrgLatitude] = useState("");
  const changeOrgLatitude = (event) => {
    setOrgLatitude(event.target.value);
  };
  const [orgLongitude, setOrgLongitude] = useState("");
  const changeOrgLongitude = (event) => {
    setOrgLongitude(event.target.value);
  };

  const changeOrgImage = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
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
    await createNewOrg(
      user.signInUserSession.idToken.jwtToken,
      selectedFile,
      fileName,
      orgName,
      orgDesc,
      orgLatitude,
      orgLongitude,
      orgPhysical,
      props.city
    )
      .then(setShow(false))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Org
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a new Org</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} md="20" controlId="validationCustom00">
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                required
                type="text"
                maxLength={200}
                onChange={changeOrgName}
              />
            </Form.Group>
            <Form.Group controlId="validationCustom01">
              <Form.Check
                type="checkbox"
                label="Physical Org"
                onClick={changeOrgPhysical}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom02">
              <Form.Label>Org Description</Form.Label>
              <Form.Control
                type="text"
                maxLength={1200}
                required
                onChange={changeOrgDesc}
              />
              <Form.Text> Limited to 120 chars</Form.Text>
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom03">
              <Form.Label>Org Latitude</Form.Label>
              <Form.Control
                type="number"
                step="0.000000000000001"
                maxLength={120}
                onChange={changeOrgLatitude}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom04">
              <Form.Label>Org Longitude</Form.Label>
              <Form.Control
                type="number"
                step="0.000000000000001"
                maxLength={120}
                onChange={changeOrgLongitude}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom05">
              <Form.Label>Org Image</Form.Label>
              <Form.Control
                type="file"
                maxLength={120}
                required
                accept=".png"
                onChange={changeOrgImage}
              />
            </Form.Group>

            <Button type="submit">Create Org</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
