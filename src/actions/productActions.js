//import { instance as axios } from '../axios/axiosInstance'
import axios from 'axios'
import * as productConstants from '../constants/productConstants'

const product_list_request = () => ({
	type: productConstants.PRODUCT_LIST_REQUEST
})

const product_list_success = (payload) => ({
	type: productConstants.PRODUCT_LIST_SUCCESS,
	payload
})

const product_list_fail = (payload) => ({
	type: productConstants.PRODUCT_LIST_FAIL,
	payload
})

export const listProducts = () => async (dispatch) => {
	try {
		dispatch(product_list_request())
		const { data } = await axios.get('/api/products')
		dispatch(product_list_success(data))
	} catch (error) {
		const errMsg = error?.response?.data?.message ?? error?.message
		dispatch(product_list_fail(errMsg))
	}
}

const product_details_request = () => ({
	type: productConstants.PRODUCT_DETAILS_REQUEST
})

const product_details_success = (payload) => ({
	type: productConstants.PRODUCT_DETAILS_SUCCESS,
	payload
})

const product_details_fail = (payload) => ({
	type: productConstants.PRODUCT_DETAILS_FAIL,
	payload
})

export const listProductDetail = (id) => async (dispatch) => {
	try {
		dispatch(product_details_request())
		const {
			data: { data }
		} = await axios.get(`https://ecomm-epcc.herokuapp.com/product/${id}`)
		dispatch(product_details_success(data))
	} catch (error) {
		console.log(error)
		const errMsg = error?.response?.data?.message ?? error?.message
		dispatch(product_details_fail(errMsg))
	}
}
