import axios from 'axios'

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

export { apiCall }
