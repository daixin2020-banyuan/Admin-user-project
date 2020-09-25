import Config from "./config";
import axios from "axios";
import { Message } from "element-ui";

var api = axios.create({
  baseURL: Config.baseURL,
  timeout: 300000
});

api.interceptors.request.use(
  config => {
    const id = localStorage.getItem("user") || "";
    if (id) {
      config.headers.user = id;
    }
    console.log("路由拦截====发送请求的时候", config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const Post = async (url, data) => {
  const response = await api.post(url, data).catch(error => {
    errorHandler(error);
  });
  return responseHandler(response);
};

const Get = async (url, data) => {
  const response = await api.get(url, data).catch(error => {
    errorHandler(error);
  });
  return responseHandler(response);
};

const Del = async (url, data) => {
  const response = await api
    .request({ data, url, method: "delete" })
    .catch(error => {
      errorHandler(error);
    });
  return responseHandler(response);
};

const Put = async (url, data) => {
  const response = await api.put(url, data).catch(error => {
    errorHandler(error);
  });
  return responseHandler(response);
};

//公共处理
const responseHandler = response => {
  console.log("response", response);
  if (response && response.status == 200) {
    if (!response.data) {
      return {};
    } else {
      return response.data;
    }
  }
  return null;
};

//公共处理错误方法
const errorHandler = error => {
  console.log("error.response", error.response);
  let errorMsg =
    (error.response && error.response.data && error.response.data.message) ||
    "请重新尝试";
  Message({
    message: errorMsg,
    type: "warning"
  });
};

export { Post, Get, Del, Put };
