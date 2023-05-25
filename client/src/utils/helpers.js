import axios from 'axios'

const apiPostCall = baseUrl => endpoint => (params = {}) =>
  axios.post(`${baseUrl}${endpoint}`, params)

const apiGetCall = baseUrl => endpoint =>
  axios.get(`${baseUrl}${endpoint}`)

export { apiPostCall, apiGetCall }