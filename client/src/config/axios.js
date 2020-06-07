import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://localhost:3010/'
})

export default axios