export async function get_cities(sessionToken) {
  let response = await fetch(
    "https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/city",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionToken,
      },
    }
  );
  let result = await response.json();
  return result;
}

export async function createNewCity(
  sessionToken,
  selectedFile,
  fileName,
  cityName,
  cityIntro,
  cityLatitude,
  cityLongitude
) {
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/city?fileName=${fileName}&cityName=${cityName}&cityIntro=${cityIntro}&cityLatitude=${cityLatitude}&cityLongitude=${cityLongitude}`,
    {
      method: "POST",
      body: selectedFile,
      headers: {
        Authorization: sessionToken,
      },
    }
  );
}

export async function deleteCity(sessionToken, cityId, cityName) {
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/city?cityId=${cityId}&cityName=${cityName}`,
    {
      method: "DELETE",
      headers: {
        Authorization: sessionToken,
      },
    }
  );
}

export async function patchCity(
  sessionToken,
  cityId,
  cityName,
  cityIntro,
  cityLatitude,
  cityLongitude,
  selectedFile,
  fileName
) {
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/city?cityId=${cityId}&cityName=${cityName}&cityIntro=${cityIntro}&cityLatitude=${cityLatitude}&cityLongitude=${cityLongitude}&fileName=${fileName}`,
    {
      method: "PATCH",
      body: selectedFile,
      headers: {
        Authorization: sessionToken,
      },
    }
  );
}

export async function get_orgs(sessionToken, city) {
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/org?city=${city}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionToken,
      },
    }
  );
  let result = await response.json();
  return result;
}

export async function createNewOrg(
  sessionToken,
  selectedFile,
  fileName,
  orgName,
  orgDesc,
  orgLatitude,
  orgLongitude,
  orgPhysical,
  cityName
) {
  console.log(selectedFile);
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/org?fileName=${fileName}&orgName=${orgName}&orgDesc=${orgDesc}&orgLatitude=${orgLatitude}&orgLongitude=${orgLongitude}&orgPhysical=${orgPhysical}&cityName=${cityName}`,
    {
      method: "POST",
      body: selectedFile,
      headers: {
        Authorization: sessionToken,
      },
    }
  );
}

export async function deleteOrg(sessionToken, cityName, orgName) {
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/org?cityName=${cityName}&orgName=${orgName}`,
    {
      method: "DELETE",
      headers: {
        Authorization: sessionToken,
      },
    }
  );
}

export async function patchOrg(
  sessionToken,
  cityName,
  orgId,
  orgName,
  orgDescription,
  orgLatitude,
  orgLongitude,
  orgPhysical,
  selectedFile,
  fileName
) {
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/org?cityName=${cityName}&orgName=${orgName}&orgDescription=${orgDescription}&orgLatitude=${orgLatitude}
      &orgLongitude=${orgLongitude}&orgPhysical=${orgPhysical}&fileName=${fileName}&orgId=${orgId}`,
    {
      method: "PATCH",
      body: selectedFile,
      headers: {
        Authorization: sessionToken,
      },
    }
  );
}

export async function getTours(sessionToken, orgId) {
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/tour?orgId=${orgId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionToken,
      },
    }
  );
  let result = await response.json();
  return result;
}

export async function createNewTour(
  sessionToken,
  selectedFile,
  fileName,
  tourName,
  tourDesc,
  tourLatitude,
  tourLongitude,
  hasAudio,
  isOutdoors,
  orgId
) {
  console.log(selectedFile);
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/tour?fileName=${fileName}&tourName=${tourName}
      &tourDesc=${tourDesc}&tourLatitude=${tourLatitude}&tourLongitude=${tourLongitude}&hasAudio=${hasAudio}&isOutdoors=${isOutdoors}&orgId=${orgId}&`,
    {
      method: "POST",
      body: selectedFile,
      headers: {
        Authorization: sessionToken,
      },
    }
  );
}

export async function patchTour(
  sessionToken,
  selectedFile,
  fileName,
  tourName,
  tourDesc,
  tourLatitude,
  tourLongitude,
  tourHasAudio,
  tourOutside,
  currentTourId
) {
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/tour?fileName=${fileName}&tourName=${tourName}&tourDesc=${tourDesc}
    &tourLatitude=${tourLatitude}&tourLongitude=${tourLongitude}&tourHasAudio=${tourHasAudio}&tourOutside=${tourOutside}&currentTourId=${currentTourId}`,
    {
      method: "PATCH",
      body: selectedFile,
      headers: {
        Authorization: sessionToken,
      },
    }
  );
}

export async function deleteTour(sessionToken, tourId, orgId) {
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/tour?tourId=${tourId}&orgId=${orgId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: sessionToken,
      },
    }
  );
}

export async function createNewOutdoorObject(
  sessionToken,
  selectedImageFile,
  imageFileName,
  // selectedAudioFile,
  // audioFileName,
  objectName,
  objectDetails,
  objectLatitude,
  objectLongitude,
  city,
  tourId
) {
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/outdoor_object?objectName=${objectName}&objectDetails=${objectDetails}
      &objectLatitude=${objectLatitude}&objectLongitude=${objectLongitude}&city=${city}&imageFileName=${imageFileName}&tourId=${tourId}`,
    {
      method: "POST",
      headers: {
        Authorization: sessionToken,
      },
      body: selectedImageFile,
    }
  );
}

export async function get_outdoor_objects(sessionToken, tourId) {
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/outdoor_object?tourId=${tourId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionToken,
      },
    }
  );
  let result = await response.json();
  return result;
}

export async function patchOutdoorObject(
  sessionToken,
  selectedImageFile,
  imageFileName,
  objectName,
  objectDetails,
  objectLatitude,
  objectLongitude,
  currentObjectId
) {
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/outdoor_object?objectName=${objectName}&objectDetails=${objectDetails}
      &objectLatitude=${objectLatitude}&objectLongitude=${objectLongitude}&imageFileName=${imageFileName}&currentObjectId=${currentObjectId}`,
    {
      method: "PATCH",
      body: selectedImageFile,
      headers: {
        Authorization: sessionToken,
      },
    }
  );
}

export async function delete_outdoor_object(sessionToken, object_id) {
  let response = await fetch(
    `https://o0i2i1jq26.execute-api.us-east-1.amazonaws.com/prod/outdoor_object?object_id=${object_id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: sessionToken,
      },
    }
  );
}
