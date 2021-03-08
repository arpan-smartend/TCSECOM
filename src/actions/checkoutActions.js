import axios from 'axios'
import * as checkoutConstants from '../constants/checkoutConstants'

const checkout_request = () => ({
	type: checkoutConstants.CHECKOUT_REQUEST
})

const checkout_success = (payload) => ({
	type: checkoutConstants.CHECKOUT_SUCCESS,
	payload
})

const checkout_fail = (payload) => ({
	type: checkoutConstants.CHECKOUT_FAIL,
	payload
})

const checkout_reset = (payload) => ({
	type: checkoutConstants.CHECKOUT_RESET,
	payload
})

export const checkoutOrder = () => async (dispatch, getState) => {
	try {
		dispatch(checkout_request())
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		const { cartId, name, email } = getState().userLogin.userInfo
		// const customerId = getState().userLogin.userInfo.id
		const billingAddress = getState().cart.billingAddress
		const shippingAddress = getState().cart.shippingAddress

		const { data } = await axios.post(
			`https://ecomm-epcc.herokuapp.com/checkout/${cartId}`,
			{
				data: {
					customer: {
						email,
						name
					},
					billing_address: billingAddress,
					shipping_address: shippingAddress
				}
			},
			config
		)
		dispatch(checkout_success(data))
	} catch (error) {
		const errMsg = error?.response?.data?.message ?? error?.message
		dispatch(checkout_fail(errMsg))
	}
}

export const checkoutReset = () => (dispatch) => {
	dispatch(checkout_reset())
}
