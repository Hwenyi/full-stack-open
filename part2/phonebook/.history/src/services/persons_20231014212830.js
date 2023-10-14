import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const url = `${baseUrl}/${id}`;
  const request = axios.delete(url);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const url = `${baseUrl}/${id}`;
  const request = axios.put(url, updateObject);
  return request.then((response) => response.data);
};
