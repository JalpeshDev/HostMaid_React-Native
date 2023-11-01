import axios from "axios";
import {
  errorValidation,
  RequestType,
} from "./APIServiceManager";
import Toast from "react-native-root-toast";
import { ToastStyle } from "../GlobalStyle";
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "",
};

export const APIManager = (data: any, type: RequestType, formData: Boolean = false) => {

  return new Promise(async (resolve, reject) => {
    let bodyData = data.body;

    let config = {
      method: type,
      maxBodyLength: Infinity,
      url: data.url,
      headers: {},
      timeout: formData ? 120000 : 12000,
      data: formData ? data.body : bodyData,
    };

    if (data.header != null) {
      config.headers = data.header;
    }

    if (data.header != null) {
      config.headers = data.header;
    }

    axios
      .request(config)
      .then((response: any) => {
        errorValidation(response.data, response.data.status).then(
          (data) => {
            resolve(data);
          }
        );
      })
      .catch((error: any) => {
        if (error?.response != undefined) {
          let errorData = null;
          if (error?.response.data != null) {
            errorData = error?.response?.data;
          }
          errorValidation(errorData, error.response.status).then((data: any) => {
            if (data.status == 5) {
              Toast.show(data.message, ToastStyle);
              if (data.message == "Unauthenticated.") {
                reject({ message: "Unauthenticated", status: 401 })
              } else {
                resolve(null);
              }

            } else if (data.status == 6 || data.status == 7) {
              Toast.show(data.message, ToastStyle);
              resolve(null);
            } else {
              resolve(data);
            }
          });
        } else {
          reject(error?.message);
        }
      });
  });
};