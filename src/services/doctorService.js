import { config, handleResponse } from "./envService";
const endpoint = "doctor";
const specialist = "specialist";
const rating = "rating";
const razorpay = "razorpay/create";

const getAllDocotor = (id) => {
    return fetch(`${config.api}${endpoint}/get/${specialist}?specialist=${id}`, {
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
  const getAllSpecialist = () => {
    return fetch(`${config.api}${specialist}/getall`, {
      ...config.options,
    })
      .then((response) => handleResponse(response))
      .then((response) => response)
      .catch((error) => {
        console.error(error);
        throw Error(error);
      });
  };
  const giveRating = (data) => {
      return fetch(`${config.api}${rating}/create`, {
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

  const razorpayment = (data) => {
    return fetch(`${config.api}${razorpay}`, {
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
const allDocotors = () => {
  return fetch(`${config.api}doctor/getall`, {
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
    getDocotorDetails,
    getAllSpecialist,
    giveRating,
    razorpayment,
    allDocotors
};

export default methods;
