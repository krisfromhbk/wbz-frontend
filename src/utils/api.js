import axios from 'axios'
import MockAdapter from "axios-mock-adapter";

const apiCall = (url, method, ...args) => new Promise((resolve, reject) => {
  axios({
    url: url,
    method: method,
    data: args[0],
    baseURL: 'https://localhost:9000/api/'
  })
  .then((response) => {
    resolve(response.data)
  })
  .catch((error) => {
    reject(new Error(error))
  })
})

let mock = new MockAdapter(axios, {delayResponse: 1500})

mock.onPost('auth/login').reply(200, {
  token: 'here is your token'
})

export { apiCall }
