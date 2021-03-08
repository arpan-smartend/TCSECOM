import axios from 'axios'

export const instance = axios.create({
	baseURL: 'https://ecomm-epcc.herokuapp.com'
})
