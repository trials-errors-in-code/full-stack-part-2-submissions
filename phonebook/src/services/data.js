import axios from "axios";
const url = "http://localhost:3001/persons"


const getAll = () => {
  return axios.get(url).then(response => response.data)
}

const create = (newPerson) => {
  return axios.post(url, newPerson).then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${url}/${id}`).then(response => console.log(response.data))
}
const updateNumber = (id, updatedPerson) => {
  return axios.put(`${url}/${id}`, updatedPerson).then(res => res.data)
}





const dataModify = { getAll, create, remove, updateNumber }
export default dataModify