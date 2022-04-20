import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_orgs, deleteOrg, patchOrg } from "../Utils";
import { Auth } from "aws-amplify";
import OrgForm from "../components/OrgForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const callGetOrgs = async (city) => {
  const user = await Auth.currentAuthenticatedUser();
  return await get_orgs(user.signInUserSession.idToken.jwtToken, city);
};

const callDeleteOrg = async (cityId, cityName) => {
  const user = await Auth.currentAuthenticatedUser();
  await deleteOrg(user.signInUserSession.idToken.jwtToken, cityId, cityName);
};

export default function Orgs() {
  let params = useParams();
  const [orgMap, setOrgMap] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [validated, setValidated] = useState(false);
  const handleClose = () => setShowEdit(false);
  const [currentOrgId, setCurrentOrgId] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");

  const [orgName, setOrgName] = useState("");
  const changeOrgName = (event) => {
    setOrgName(event.target.value);
  };

  const [orgPhysical, setOrgPhysical] = useState(false);
  const changeOrgPhysical = (event) => {
    setOrgPhysical(event.target.value == "on");
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

  function setOrgs(cities) {
    const buildOrgMap = {};
    cities.forEach(function (item, index) {
      buildOrgMap[item["ID"]] = item;
    });
    setOrgMap(buildOrgMap);
  }

  function makeButton(data) {
    return (
      <button
        key={data.ID}
        onClick={() => {
          setCurrentOrgId(data.ID);
          setOrgName(data.OrgName);
          setOrgPhysical(data.OrgPhysical);
          setOrgDesc(data.OrgDescription);
          setOrgLatitude(data.OrgLatitude);
          setOrgLongitude(data.OrgLongitude);
          setShowEdit(true);
        }}
      >
        {data.OrgName}
      </button>
    );
  }

  const handleDelete = async () => {
    await callDeleteOrg(orgMap[currentOrgId].City, orgName);
    setShowEdit(false);
  };
  const handleSubmit = async (e) => {
    console.log("here");
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }
    e.preventDefault();
    const user = await Auth.currentAuthenticatedUser();
    await patchOrg(
      user.signInUserSession.idToken.jwtToken,
      params.city,
      currentOrgId,
      orgName,
      orgDesc,
      orgLatitude,
      orgLongitude,
      orgPhysical,
      selectedFile,
      fileName
    );
    setShowEdit(false);
  };

  useEffect(() => {
    callGetOrgs(params.city).then((data) => {
      setOrgs(data);
    });
  }, []);

  return (
    <div>
      {Object.values(orgMap).map(makeButton, this)}
      <div>
        <OrgForm city={params.city} />
      </div>
      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {orgName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustom01">
              <Form.Check
                type="checkbox"
                label="Physical Org"
                onClick={changeOrgPhysical}
                defaultChecked={orgPhysical}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom02">
              <Form.Label>Org Description</Form.Label>
              <Form.Control
                type="text"
                maxLength={1200}
                required
                onChange={changeOrgDesc}
                defaultValue={orgDesc}
              />
              <Form.Text> Limited to 120 chars</Form.Text>
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom03">
              <Form.Label>Org Latitude</Form.Label>
              <Form.Control
                type="number"
                step="0.000000000000001"
                min="0"
                maxLength={120}
                onChange={changeOrgLatitude}
                defaultValue={orgLatitude}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom04">
              <Form.Label>Org Longitude</Form.Label>
              <Form.Control
                type="number"
                step="0.000000000000001"
                min="0"
                maxLength={120}
                onChange={changeOrgLongitude}
                defaultValue={orgLongitude}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom05">
              <Form.Label>Org Image</Form.Label>
              <Form.Control
                type="file"
                maxLength={120}
                accept=".png"
                onChange={changeOrgImage}
              />
            </Form.Group>
            <Button type="submit">Update Org</Button>
            <Button onClick={handleDelete}>Delete Org</Button>
            <Link to={"/tours/" + currentOrgId + "/" + params.city}>
              <Button>Manage Tours</Button>
            </Link>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
