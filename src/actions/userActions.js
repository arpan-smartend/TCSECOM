import axios from 'axios'
import * as userConstants from '../constants/userConstants'

const user_login_request = () => ({
	type: userConstants.USER_LOGIN_REQUEST
})

const user_login_success = (payload) => ({
	type: userConstants.USER_LOGIN_SUCCESS,
	payload
})

const user_login_fail = (payload) => ({
	type: userConstants.USER_LOGIN_FAIL,
	payload
})

const user_logout = () => ({
	type: userConstants.USER_LOGOUT
})

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch(user_login_request())
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		)

		dispatch(user_login_success(data))
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		const errMsg = error?.response?.data?.message ?? error?.message
		dispatch(user_login_fail(errMsg))
	}
}

const user_register_request = () => ({
	type: userConstants.USER_REGISTER_REQUEST
})
const user_register_success = (payload) => ({
	type: userConstants.USER_REGISTER_SUCCESS,
	payload
})

const user_register_fail = (payload) => ({
	type: userConstants.USER_REGISTER_FAIL,
	payload
})

const user_register_reset = () => ({
	type: userConstants.USER_REGISTER_RESET
})

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch(user_register_request())
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		let {
			data: { data }
		} = await axios.post(
			'https://ecomm-epcc.herokuapp.com/create/customer',
			{
				data: {
					type: 'customer',
					name,
					email,
					password
				}
			},
			config
		)
		const cartId = `cart-${data.id.split('-')[0]}`
		data = { ...data, cartId }
		dispatch(user_register_success(data))
		dispatch(user_login_success(data))
		localStorage.setItem('userInfo', JSON.stringify(data))
	} catch (error) {
		const errMsg = error?.response?.data?.message ?? error?.message
		dispatch(user_register_fail(errMsg))
	}
}

const user_details_request = () => ({
	type: userConstants.USER_DETAILS_REQUEST
})
const user_details_success = (payload) => ({
	type: userConstants.USER_DETAILS_SUCCESS,
	payload
})

const user_details_fail = (payload) => ({
	type: userConstants.USER_DETAILS_FAIL,
	payload
})

const user_details_reset = () => ({
	type: userConstants.USER_DETAILS_RESET
})

export const userDetails = (id) => async (dispatch, getState) => {
	try {
		const {
			userLogin: {
				userInfo: { token }
			}
		} = getState()

		dispatch(user_details_request())
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}
		const { data } = await axios.get(`/api/users/${id}`, config)
		dispatch(user_details_success(data))
	} catch (error) {
		const errMsg = error?.response?.data?.message ?? error?.message
		dispatch(user_details_fail(errMsg))
	}
}

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo')
	dispatch(user_logout())
	dispatch(user_register_reset())
	dispatch(user_details_reset())
}
