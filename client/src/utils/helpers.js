import axios from 'axios'

const apiPostCall = baseUrl => endpoint => (params = {}) =>
  axios.post(`${baseUrl}${endpoint}`, {
    withcredentials: true,
    ...params
  })

const apiGetCall = baseUrl => endpoint =>
  axios.get(`${baseUrl}${endpoint}`, { withCredentials: true })

export { apiPostCall, apiGetCall }