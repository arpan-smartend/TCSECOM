import * as checkoutConstants from '../constants/checkoutConstants'

const initalStateForCheckoutReduder = {
	loading: false,
	checkoutData: null,
	error: null
}

const checkoutRequest = (state) => ({
	...state,
	loading: true
})

const checkoutSuccess = (state, payload) => ({
	...state,
	loading: false,
	checkoutData: payload,
	error: null
})
const checkoutFail = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})

const checkoutReset = () => ({
	...initalStateForCheckoutReduder
})

export const checkoutReducer = (
	state = initalStateForCheckoutReduder,
	{ type, payload = {} }
) => {
	switch (type) {
		case checkoutConstants.CHECKOUT_REQUEST:
			return checkoutRequest(state)

		case checkoutConstants.CHECKOUT_SUCCESS:
			return checkoutSuccess(state, payload)

		case checkoutConstants.CHECKOUT_FAIL:
			return checkoutFail(state, payload)

		case checkoutConstants.CHECKOUT_RESET:
			return checkoutReset()

		default:
			return state
	}
}
