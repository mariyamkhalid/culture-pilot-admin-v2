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
