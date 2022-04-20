import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { get_cities } from "../Utils";
import { useAsync } from "react-async";
import { View } from "@aws-amplify/ui-react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import { deleteCity, patchCity } from "../Utils";
import { Link } from "react-router-dom";

const callGetCities = async () => {
  const user = await Auth.currentAuthenticatedUser();
  return await get_cities(user.signInUserSession.idToken.jwtToken);
};

const callDeleteCity = async (cityId, cityName) => {
  const user = await Auth.currentAuthenticatedUser();
  await deleteCity(user.signInUserSession.idToken.jwtToken, cityId, cityName);
};

export default function City() {
  const [validated, setValidated] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [citiesMap, setCitiesMap] = useState({});
  const [currentCityId, setCurrentCityId] = useState("");
  const [currentCityName, setCurrentCityName] = useState("");

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
    await patchCity(
      user.signInUserSession.idToken.jwtToken,
      currentCityId,
      citiesMap[currentCityId].City,
      cityIntro,
      cityLatitude,
      cityLongitude,
      selectedFile,
      fileName
    );
    setShowEdit(false);
  };

  const handleClose = () => setShowEdit(false);
  const handleDelete = async () => {
    await callDeleteCity(currentCityId, citiesMap[currentCityId].City);
    setShowEdit(false);
  };

  const [cityIntro, setCityIntro] = useState("");
  const changeCityIntro = (event) => {
    setCityIntro(event.target.value);
  };
  const [cityLatitude, setCityLatitude] = useState();
  const changeCityLatitude = (event) => {
    setCityLatitude(event.target.value);
  };
  const [cityLongitude, setCityLongitude] = useState("");
  const changeCityLongitude = (event) => {
    setCityLongitude(event.target.value);
  };
  const [selectedFile, setSelectedFile] = useState();
  const [fileName, setFileName] = useState("");
  const changeCityImage = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  function makeButton(data) {
    return (
      <button
        key={data.City}
        onClick={() => {
          setCurrentCityName(data.City);
          setCurrentCityId(data.Id);
          setCityIntro(data.Intro);
          setCityLatitude(data.Latitude);
          setCityLongitude(data.Longitude);
          setShowEdit(true);
        }}
      >
        {data.City}
      </button>
    );
  }
  function setCities(cities) {
    const cityMap = {};
    cities.forEach(function (item, index) {
      cityMap[item["Id"]] = item;
    });
    setCitiesMap(cityMap);
  }

  useEffect(() => {
    callGetCities().then((data) => {
      setCities(data);
    });
  }, []);

  return (
    <div>
      {Object.values(citiesMap).map(makeButton, this)}
      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit {citiesMap[currentCityId] ? citiesMap[currentCityId].City : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} md="20" controlId="validationCustom02">
              <Form.Label>City Intro</Form.Label>
              <Form.Control
                type="text"
                maxLength={1200}
                required
                defaultValue={
                  citiesMap[currentCityId] ? citiesMap[currentCityId].Intro : ""
                }
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
                defaultValue={
                  citiesMap[currentCityId]
                    ? citiesMap[currentCityId].Latitude
                    : ""
                }
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
                defaultValue={
                  citiesMap[currentCityId]
                    ? citiesMap[currentCityId].Longitude
                    : ""
                }
                onChange={changeCityLongitude}
              />
            </Form.Group>
            <Form.Group as={Col} md="20" controlId="validationCustom04">
              <Form.Label>City Image</Form.Label>
              <Form.Control
                type="file"
                maxLength={120}
                accept=".png"
                onChange={changeCityImage}
              />
            </Form.Group>
            <Button type="submit">Update City</Button>
            <Button onClick={handleDelete}>Delete City</Button>
            <Link to={"/orgs/" + currentCityName}>
              <Button>Manage Orgs</Button>
            </Link>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
