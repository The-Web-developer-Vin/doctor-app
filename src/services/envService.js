const config = {
  api: "http://localhost:8020/api/v1/",
  options: {
    headers: {
      "content-type": "application/json",
    },
  },
};
const hostUrl = "http://localhost:8020/";
const handleResponse = (response) => {
  if (response.status === 200) {
    return response.json();
  } else {
    throw Error(response.json() | "error");
  }
};
export { config, hostUrl, handleResponse };
