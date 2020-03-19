import axios from "axios";
import Cookie from "js-cookie";

const instance = axios.create();

instance.interceptors.request.use(
  axiosConfig => {
    // attach accessToken
    axiosConfig.headers = {
      "Content-Type": "application/json"
    };
    const token = Cookie.get("token");

    if (token) {
      axiosConfig.headers = {
        ...axiosConfig.headers,
        Authorization: `bearer ${token}`
      };
    }
    return axiosConfig;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
