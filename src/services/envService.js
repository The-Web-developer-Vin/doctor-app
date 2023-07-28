// const userinfo= JSON.parse(localStorage.getItem("user"))
//  = userinfo?.token
const config = {
  api: "https://backend.organiclife.live/api/v1/",
  options: {
    headers: {
      // 'Authorization': "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoSWQiOiI2M2I2Nzg3MzNkNjIyOTBkMTk3YThiZjciLCJpYXQiOjE2NzMyNDM2NTJ9.vfgcYGxuWO77-y7rVgdwwiwqXccOk5NVq4XKQXOldOE',
      "content-type": "application/json",
    },
  },
};
const hostUrl = "https://backend.organiclife.live/";
const handleResponse = (response) => {
  if (response.status === 200) {
    return response.json();
  } else {
    throw Error(response.json() | "error");
  }
};
export { config, hostUrl, handleResponse };
