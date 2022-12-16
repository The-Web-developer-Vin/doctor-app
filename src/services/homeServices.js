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

const methods = {
desease,
};

export default methods;
