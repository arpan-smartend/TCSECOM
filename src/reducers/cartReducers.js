import * as cartConstants from '../constants/cartConstants'

const initialState = {
	loading: false,
	cartDetails: null,
	shippingAddress: {},
	billingAddress: {},
	error: null
}

const cartRequest = (state) => ({
	...state,
	loading: true,
	error: null
})
const cartCreateGet = (state, payload) => ({
	...state,
	loading: false,
	cartDetails: payload
})

const cartAddItem = (state, payload) => ({
	...state,
	cartDetails: payload,
	loading: false
})

const cartRemoveItem = (state, payload) => {
	const updatedCartItems = state.cartItems.filter(
		(item) => item.product !== payload
	)
	return {
		...state,
		cartItems: updatedCartItems
	}
}

const saveShippingAddress = (state, payload) => ({
	...state,
	shippingAddress: payload
})

const saveBillingAddress = (state, payload) => ({
	...state,
	billingAddress: payload
})

const cartError = (state, payload) => ({
	...state,
	loading: false,
	error: payload
})

export const cartReducer = (state = initialState, { type, payload = {} }) => {
	switch (type) {
		case cartConstants.CART_REQUEST:
			return cartRequest(state)

		case cartConstants.CART_CREATE_GET:
			return cartCreateGet(state, payload)

		case cartConstants.CART_ADD_ITEM:
			return cartAddItem(state, payload)

		case cartConstants.CART_REMOVE_ITEM:
			return cartRemoveItem(state, payload)

		case cartConstants.CART_SAVE_SHIPPING_ADDRESS:
			return saveShippingAddress(state, payload)

		case cartConstants.CART_SAVE_BILLING_ADDRESS:
			return saveBillingAddress(state, payload)

		case cartConstants.CART_ERROR:
			return cartError(state, payload)

		default:
			return state
	}
}
