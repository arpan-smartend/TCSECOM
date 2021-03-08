import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	productListReducer,
	productDetailsReducer
} from './reducers/productReducers'

import {
	userDetailsReducer,
	userLoginReducer,
	userRegisterReducer
} from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import { checkoutReducer } from './reducers/checkoutReduder'

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	checkout: checkoutReducer
})

// const cartItemsFromStorage = localStorage.getItem('cartItems')
// 	? JSON.parse(localStorage.getItem('cartItems'))
// 	: []

const userInfoFromStorage = localStorage.getItem('userInfo')
	? {
			loading: false,
			userInfo: JSON.parse(localStorage.getItem('userInfo')),
			error: null
	  }
	: {
			loading: false,
			userInfo: null,
			error: null
	  }

const initialState = {
	// cart: {
	// 	cartItems: cartItemsFromStorage
	// },
	userLogin: userInfoFromStorage
}

const middleware = [thunk]

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
