import axios from "axios";
import { baseUrl } from "./url";

const setAuth = () => {
  return {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
};

export const getInfo = async () => {
  try {
    const result = await axios.get(baseUrl + `/info`, setAuth());
    return result.data;
  } catch (error) {
    alert("네트워크 오류 발생");
    return { success: false };
  }
};

export const getList = async (skip, take) => {
  try {
    const result = await axios.get(
      baseUrl + `/list?skip=${skip}&take=${take}`,
      setAuth()
    );
    return result.data;
  } catch (error) {
    return alert("네트워크 오류 발생");
  }
};

export const setState = async (reservationId, state) => {
  try {
    if (state) {
      const result = await axios.put(
        baseUrl + "/accept",
        { reservationId },
        setAuth()
      );
      return result.data;
    } else {
      const result = await axios.put(
        baseUrl + "/reject",
        { reservationId },
        setAuth()
      );
      return result.data;
    }
  } catch (error) {
    return alert("네트워크 오류 발생");
  }
};
