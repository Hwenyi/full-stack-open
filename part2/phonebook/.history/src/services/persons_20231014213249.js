import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const url = `${baseUrl}/${id}`;
  const request = axios.delete(url);
  return request.then((response) => response.data);
};

const update = (id, updatedObject) => {
  const url = `${baseUrl}/${id}`;
  const request = axios.put(url, updatedObject);
  return request.then((response) => response.data);
};

export default { create, remove, update };
