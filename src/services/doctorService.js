import { config, handleResponse } from "./envService";
const endpoint = "doctor";
const getAllDocotor = (params) => {
    return fetch(`${config.api}${endpoint}/getall`, {
      ...config.options,
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };
  const getDocotorDetails = (id) => {
    return fetch(`${config.api}${endpoint}/${id}`, {
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
    getAllDocotor,
    getDocotorDetails
};

export default methods;
