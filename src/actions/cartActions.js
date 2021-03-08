import axios from 'axios'
import * as cartConstants from '../constants/cartConstants'

const cartRequest = () => ({
	type: cartConstants.CART_REQUEST
})

const cartCreateGet = (payload) => ({
	type: cartConstants.CART_CREATE_GET,
	payload
})

const cartAddItem = (payload) => ({
	type: cartConstants.CART_ADD_ITEM,
	payload
})

const cartRemoveItem = (productId) => ({
	type: cartConstants.CART_REMOVE_ITEM,
	payload: productId
})

const save_shipping_address = (payload) => ({
	type: cartConstants.CART_SAVE_SHIPPING_ADDRESS,
	payload
})

const save_billing_address = (payload) => ({
	type: cartConstants.CART_SAVE_BILLING_ADDRESS,
	payload
})

const cartError = (payload) => ({
	type: cartConstants.CART_ERROR,
	payload
})

export const createGetCart = () => async (dispatch, getState) => {
	try {
		dispatch(cartRequest())
		const cartId = getState().userLogin.userInfo.cartId
		const { data } = await axios.get(
			`https://ecomm-epcc.herokuapp.com/basket/${cartId}`
		)

		dispatch(cartCreateGet(data))
	} catch (error) {
		const errMsg = error?.response?.data?.message ?? error?.message
		dispatch(cartError(errMsg))
	}
}

export const addToCart = (id, type, quantity) => async (dispatch, getState) => {
	try {
		dispatch(cartRequest())
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		const cartId = getState().userLogin.userInfo.cartId
		await axios.post(
			`https://ecomm-epcc.herokuapp.com/basket/addItem/${cartId}`,
			{
				data: {
					id,
					type,
					quantity
				}
			},
			config
		)
		const { data } = await axios.get(
			`https://ecomm-epcc.herokuapp.com/basket/${cartId}`
		)

		dispatch(cartCreateGet(data))

		//dispatch(cartAddItem(data))
	} catch (error) {
		const errMsg = error?.response?.data?.message ?? error?.message
		dispatch(cartError(errMsg))
	}
	//we can only save string in localstorage, that's why we are using JSON.stringify
	//localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch(cartRemoveItem(id))
	//localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveAddress = (shippingDetails, billingDetails) => (dispatch) => {
	dispatch(save_shipping_address(shippingDetails))
	dispatch(save_billing_address(billingDetails))
	//localStorage.setItem('shippingAddress', JSON.stringify(shippingDetails))
}
