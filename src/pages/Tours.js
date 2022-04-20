import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTours, patchTour, deleteTour } from "../Utils";
import { Auth } from "aws-amplify";
import TourForm from "../components/TourForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const callGetTours = async (orgId) => {
  const user = await Auth.currentAuthenticatedUser();
  return await getTours(user.signInUserSession.idToken.jwtToken, orgId);
};
const callDeleteTour = async (tourId, orgId) => {
  const user = await Auth.currentAuthenticatedUser();
  await deleteTour(user.signInUserSession.idToken.jwtToken, tourId, orgId);
};

export default function Tours() {
  let params = useParams();
  const [tourMap, setTourMap] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const handleClose = () => setShowEdit(false);
  const [validated, setValidated] = useState(false);
  const [currentTourId, setCurrentTourId] = useState("");
  const [tourName, setTourName] = useState("");
  const changeTourName = (event) => {
    setTourName(event.target.value);
  };
  const [tourHasAudio, setTourHasAudio] = useState(false);
  const changeHasAudio = (event) => {
    console.log(event.target.checked);
    setTourHasAudio(event.target.checked);
  };
  const [tourOutside, setTourOutside] = useState(false);
  const changeIsOutdoors = (event) => {
    setTourOutside(event.target.checked);
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
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const changeTourImage = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  function setTours(tours) {
    const buildTourMap = {};
    tours.forEach(function (item, index) {
      buildTourMap[item["ID"]] = item;
    });
    setTourMap(tours);
  }

  function makeButton(data) {
    return (
      <button
        key={data.ID}
        onClick={() => {
          setCurrentTourId(data.ID);
          setTourName(data.TourName);
          setTourHasAudio(data.TourAudio);
          setTourOutside(data.TourOutside);
          setTourDesc(data.TourDescription);
          setTourLatitude(data.TourMainLatitude);
          setTourLongitude(data.TourMainLongitude);
          setShowEdit(true);
        }}
      >
        {data.TourName}
      </button>
    );
  }

  useEffect(() => {
    callGetTours(params.orgId).then((data) => {
      setTours(data);
    });
  }, []);

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
    await patchTour(
      user.signInUserSession.idToken.jwtToken,
      selectedFile,
      fileName,
      tourName,
      tourDesc,
      tourLatitude,
      tourLongitude,
      tourHasAudio,
      tourOutside,
      currentTourId
    )
      .then(showEdit(false))
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = async () => {
    await callDeleteTour(currentTourId, params.orgId);
    setShowEdit(false);
  };

  return (
    <div>
      <div> {Object.values(tourMap).map(makeButton, this)}</div>
      <div>
        <TourForm orgId={params.orgId} />
      </div>
      <div>
        <Modal show={showEdit} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {tourName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group as={Col} md="20" controlId="validationCustom00">
                <Form.Label>Tour Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  maxLength={200}
                  onChange={changeTourName}
                  value={tourName}
                />
              </Form.Group>
              <Form.Group controlId="validationCustom01">
                <Form.Check
                  type="checkbox"
                  label="Has Audio"
                  onClick={changeHasAudio}
                  defaultChecked={tourHasAudio}
                />
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <Form.Check
                  type="checkbox"
                  label="Is Outdoors"
                  onClick={changeIsOutdoors}
                  defaultChecked={tourOutside}
                />
              </Form.Group>
              <Form.Group as={Col} md="20" controlId="validationCustom03">
                <Form.Label>Tour Description</Form.Label>
                <Form.Control
                  type="text"
                  maxLength={1200}
                  required
                  onChange={changeTourDesc}
                  value={tourDesc}
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
                  value={tourLatitude}
                />
              </Form.Group>
              <Form.Group as={Col} md="20" controlId="validationCustom05">
                <Form.Label>Tour Longitude</Form.Label>
                <Form.Control
                  type="number"
                  step="0.000000000000001"
                  maxLength={120}
                  onChange={changeTourLongitude}
                  value={tourLongitude}
                />
              </Form.Group>{" "}
              <Form.Group as={Col} md="20" controlId="validationCustom05">
                <Form.Label>Tour Image</Form.Label>
                <Form.Control
                  type="file"
                  maxLength={120}
                  accept=".png"
                  onChange={changeTourImage}
                />
              </Form.Group>
              <Button type="submit">Update Org</Button>
              <Button onClick={handleDelete}>Delete Tour</Button>
              <Link to={"/objects/" + currentTourId + "/" + params.city}>
                <Button>Manage Objects</Button>
              </Link>{" "}
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
