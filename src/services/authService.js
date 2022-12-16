import { config, handleResponse } from "./envService";
const endpoint = "users";
const login = (data) => {
  return fetch(`${config.api}${endpoint}/userLogin`, {
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
const signup = (data) => {
    return fetch(`${config.api}${endpoint}/userSignUp`, {
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
  login,
  signup
};

export default methods;
