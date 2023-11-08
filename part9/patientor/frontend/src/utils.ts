import axios from 'axios';
import { apiBaseUrl } from "./constants";

export const pingBackend = () => {
  void axios.get<void>(`${apiBaseUrl}/ping`);
};

export const getErrorMessage = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    if (e?.response?.data && typeof e?.response?.data === "string") {
      const message = e.response.data.replace('Something went wrong. Error: ', '');
      return message;
    } else {
      return "Unrecognized axios error";
    }
  } else {
    return "Unknown error";
  }
};