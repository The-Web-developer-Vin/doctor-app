import { config, handleResponse } from "./envService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {  useEffect, useState } from 'react'

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

  const getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"))
    } catch (error) {
     console.log(error); 
    }
  };

  const removeUser = async () => {
    try {
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.log(error);
    }
  };
  const getById = (id) => {
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



  // const userinfo= JSON.parse(localStorage.getItem("user"))
   const userinfo=''
  
const methods = {
  login,
  signup,
  userinfo,
  getUser,
  removeUser,
  getById
};

export default methods;
