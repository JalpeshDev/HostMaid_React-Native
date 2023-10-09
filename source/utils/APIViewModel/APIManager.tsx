import axios from "axios";
import {
  errorValidation,
  RequestType,
} from "./APIServiceManager";
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
        // console.log("call 123: ", error.response);
        if (error.response != undefined) {
          let errorData = null;
          if (error.response.data != null) {
            errorData = error.response.data;
          }
          errorValidation(errorData, error.response.status).then((data: any) => {
            console.log("request data config: ", data);
            if (data.status == 5) {
              resolve(null);
            } else {
              resolve(data);
            }
          });
        } else {
          resolve(null);
        }
      });
  });
};