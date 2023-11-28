import axios from "axios";

export const fetchLabelsAPI = async () => {
  try {
    let response = await axios.get(process.env.REACT_APP_API_URL + "/labels");
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const addLabelAPI = async (newLabel) => {
  try {
    let response = await axios.post(
      process.env.REACT_APP_API_URL + "/labels",
      newLabel
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const removeLabelAPI = async (id) => {
  try {
    let response = await axios.delete(
      process.env.REACT_APP_API_URL + "/labels/" + id
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
