import axios from "axios";

// API Service Manager Methods
export const APIServiceManager = {
  get: (apiUrl: any, headers: any) => {
    const config = { headers };
    return axios.get(apiUrl, config);
  },
  post: (apiUrl: any, data: any, headers = {}) => {
    const config = { headers };
    return axios.post(apiUrl, data, config);
  },
  put: (apiUrl: any, data: any, headers = {}) => {
    const config = { headers };
    return axios.put(apiUrl, data, config);
  },
  delete: (apiUrl: any, headers = {}) => {
    const config = { headers };
    return axios.delete(apiUrl, config);
  },
};

// Error Validation Methods
export const errorValidation = (res: any, code: any) => {
  console.log("code-->", code);

  return new Promise((resolve, reject) => {
    switch (code) {
      case "success":
        if (res) {
          resolve({ message: "data get successfully", status: 1, data: res });
        } else {
          resolve({ status: 10, data: null });
        }
        break;
      case ApiResponseCode.BadRequest:
        let msg = "Bad Request";
        if (res.message != null) {
          if (Array.isArray(res.message) && res.message.length > 0) {
            msg = res.message[0];
          }
        }
        resolve({ message: msg, status: 0 });
        break;
      case ApiResponseCode.Unauthorized:
        let msgValidation1 = "Unauthorized user";
        if (res.message) {
          if (Array.isArray(res.message) && res.message.length > 0) {
            msgValidation1 = res.message[0];
          } else {
            msgValidation1 = res.message;
          }
          resolve({ message: msgValidation1, status: 5 });
        } else {
          resolve({ message: msgValidation1, status: 0 });
        }
        break;
      case ApiResponseCode.NotFound:
        resolve({ message: "data not found", status: 0 });
        break;
      case ApiResponseCode.Validation || ApiResponseCode.FieldValidation:
        let msgValidation = "Validation Error";
        if (res.emailNumber_exists != null) {
          if (Array.isArray(res.message) && res.message.length > 0) {
            msgValidation = res.message[0];
          } else {
            msgValidation = res.message;
          }
          resolve({ message: msgValidation, status: 2, data: null });
        } else if (res.message != null) {
          if (Array.isArray(res.message) && res.message.length > 0) {
            msgValidation = res.message[0];
          } else {
            msgValidation = res.message;
          }
          resolve({ message: msgValidation, status: 5 });
        } else {
          resolve({ message: msgValidation, status: 0 });
        }

        break;
      default:
        break;
    }
  });
};

// Api Response Code
export enum ApiResponseCode {
  success = 200,
  created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  Validation = 403,
  FieldValidation = 422,
}

export enum RequestType {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}
