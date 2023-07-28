import { config, handleResponse } from "./envService";
const endpoint = "home_page";
const desease = (data) => {
  return fetch(`${config.api}${endpoint}/create`, {
    method: "post",
    body: data ? JSON.stringify(data) : null,
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};
const requestDoctor = (data) => {
  return fetch(`${config.api}${endpoint}/doctor/requestApproved`,{
    method: "post",
    body: data ? JSON.stringify(data) : null,
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

const getRequestedData = (id) => {
  return fetch(`${config.api}${endpoint}/get/${id}`,{
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};
const getAllAppointments = (id) => {
  return fetch(`${config.api}${endpoint}/appointments/${id}`,{
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};
const upload = (data) => {
  return fetch(`${config.api}uploads`, {
    method: "post",
    body: data ? JSON.stringify(data) : null,
    ...config.options,
  })
    .then((response) => handleResponse(response))
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
};

const methods = {
desease,
requestDoctor,
getRequestedData,
getAllAppointments,
upload
};

export default methods;
