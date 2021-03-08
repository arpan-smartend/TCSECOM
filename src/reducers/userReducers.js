import * as userConstants from '../constants/userConstants'

const initialStateForUserLoginReducer = {
	loading: false,
	userInfo: null,
	error: null
}

const userLoginRequest = (state) => ({
	...state,
	loading: true,
	error: null
})
const userLoginSuccess = (state, payload) => ({
	...state,
	loading: false,
	error: null,
	userInfo: payload
})
const userLoginFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})

const userLogout = () => ({
	...initialStateForUserLoginReducer
})

export const userLoginReducer = (
	state = initialStateForUserLoginReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case userConstants.USER_LOGIN_REQUEST:
			return userLoginRequest(state)

		case userConstants.USER_LOGIN_SUCCESS:
			return userLoginSuccess(state, payload)

		case userConstants.USER_LOGIN_FAIL:
			return userLoginFail(state, payload)

		case userConstants.USER_LOGOUT:
			return userLogout()

		default:
			return state
	}
}

const initialStateForUserRegisterReducer = {
	loading: false,
	userInfo: null,
	error: null
}

const userRegisterRequest = (state) => ({
	...state,
	loading: true,
	error: null
})
const userRegisterSuccess = (state, payload) => ({
	...state,
	loading: false,
	error: null,
	userInfo: payload
})
const userRegisterFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})
const userRegisterReset = () => ({
	...initialStateForUserRegisterReducer
})

export const userRegisterReducer = (
	state = initialStateForUserRegisterReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case userConstants.USER_REGISTER_REQUEST:
			return userRegisterRequest(state)

		case userConstants.USER_REGISTER_SUCCESS:
			return userRegisterSuccess(state, payload)

		case userConstants.USER_REGISTER_FAIL:
			return userRegisterFail(state, payload)

		case userConstants.USER_REGISTER_RESET:
			console.log('userREgisterReset')
			return userRegisterReset()

		default:
			return state
	}
}

const initialStateForUserDetailsReducer = {
	loading: false,
	user: null,
	error: null
}

const userDetailsRequest = (state) => ({
	...state,
	loading: true,
	error: null
})
const userDetailsSuccess = (state, payload) => ({
	...state,
	loading: false,
	error: null,
	user: payload
})
const userDetailsFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})
const userDetailsReset = () => ({
	...initialStateForUserDetailsReducer
})

export const userDetailsReducer = (
	state = initialStateForUserDetailsReducer,
	{ type, payload = {} }
) => {
	switch (type) {
		case userConstants.USER_DETAILS_REQUEST:
			return userDetailsRequest(state)

		case userConstants.USER_DETAILS_SUCCESS:
			return userDetailsSuccess(state, payload)

		case userConstants.USER_DETAILS_FAIL:
			return userDetailsFail(state, payload)

		case userConstants.USER_DETAILS_RESET:
			console.log('userDetailsReset')
			return userDetailsReset()

		default:
			return state
	}
}
