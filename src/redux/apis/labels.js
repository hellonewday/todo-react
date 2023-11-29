import api from ".";

export const fetchLabelsAPI = async () => {
  try {
    let response = await api.get("/labels");
    return response.data.data;
  } catch (error) {
    return error;
  }
};

export const addLabelAPI = async (newLabel) => {
  try {
    let response = await api.post("/labels", newLabel);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const removeLabelAPI = async (id) => {
  try {
    let response = await api.delete("/labels/" + id);
    return response.data;
  } catch (error) {
    return error;
  }
};
