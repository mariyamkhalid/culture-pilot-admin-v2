import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import OutdoorObjectForm from "../components/OutdoorObjectForm";
import {
  get_outdoor_objects,
  patchOutdoorObject,
  delete_outdoor_object,
} from "../Utils";
import { Auth } from "aws-amplify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const callGetObjects = async (tourId) => {
  const user = await Auth.currentAuthenticatedUser();
  return await get_outdoor_objects(
    user.signInUserSession.idToken.jwtToken,
    tourId
  );
};

const callDeleteObject = async (object_id) => {
  const user = await Auth.currentAuthenticatedUser();
  return await delete_outdoor_object(
    user.signInUserSession.idToken.jwtToken,
    object_id
  );
};

export default function OutdoorObjects() {
  let params = useParams();
  const [objectMap, setObjectMap] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const [currentObjectId, setCurrentObjectId] = useState("");

  const handleClose = () => setShowEdit(false);

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
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    e.preventDefault();
    const user = await Auth.currentAuthenticatedUser();
    await patchOutdoorObject(
      user.signInUserSession.idToken.jwtToken,
      selectedFile,
      fileName,
      objectName,
      objectDetails,
      objectLatitude,
      objectLongitude,
      currentObjectId
    );
    setShowEdit(false);
  };

  function makeButton(data) {
    return (
      <button
        key={data.ID}
        onClick={() => {
          setCurrentObjectId(data.ID);
          setObjectName(data.title);
          setObjectDetails(data.details);
          setObjectLatitude(data.latitude);
          setObjectLongitude(data.longitude);
          setShowEdit(true);
        }}
      >
        {data.title}
      </button>
    );
  }

  function setObjects(cities) {
    const buildObjectMap = {};
    cities.forEach(function (item, index) {
      buildObjectMap[item["ID"]] = item;
    });
    setObjectMap(buildObjectMap);
  }

  const handleDelete = async () => {
    await callDeleteObject(currentObjectId);
    setShowEdit(false);
  };

  useEffect(() => {
    callGetObjects(params.tourId).then((data) => {
      setObjects(data);
    });
  }, []);

  return (
    <div>
      <div>
        {Object.values(objectMap).map(makeButton, this)}
        <div>
          <OutdoorObjectForm tourId={params.tourId} city={params.city} />
        </div>
        <div>
          <Modal show={showEdit} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Object</Modal.Title>
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
                    value={objectName}
                  />
                </Form.Group>
                <Form.Group as={Col} md="20" controlId="validationCustom02">
                  <Form.Label>Object Details</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength={5000}
                    required
                    onChange={changeObjectDetails}
                    value={objectDetails}
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
                    value={objectLatitude}
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
                    value={objectLongitude}
                  />
                </Form.Group>
                <Form.Group as={Col} md="20" controlId="validationCustom05">
                  <Form.Label>Object Image</Form.Label>
                  <Form.Control
                    type="file"
                    maxLength={1200}
                    accept=".png"
                    onChange={changeObjectImage}
                  />
                </Form.Group>

                <Button type="submit">Update Object</Button>
                <Button onClick={handleDelete}>Delete Object</Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}
