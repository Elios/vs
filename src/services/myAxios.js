import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000/static'
axios.defaults.headers = {
  'Content-Type': 'application/json'
}

export default axios
