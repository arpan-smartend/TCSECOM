import * as productConstants from '../constants/productConstants'

const initialStateForProductList = {
  loading: false,
  products: [],
  error: null,
}

const productListRequest = (state) => ({
  ...state,
  loading: true,
})

const productListSuccess = (state, payload) => ({
  ...state,
  loading: false,
  products: payload,
  error: null,
})

const productListFail = (state, payload) => ({
  ...state,
  loading: false,
  error: payload,
})

export const productListReducer = (
  state = initialStateForProductList,
  { type, payload = {} }
) => {
  switch (type) {
    case productConstants.PRODUCT_LIST_REQUEST:
      return productListRequest(state)

    case productConstants.PRODUCT_LIST_SUCCESS:
      return productListSuccess(state, payload)

    case productConstants.PRODUCT_LIST_FAIL:
      return productListFail(state, payload)

    default:
      return state
  }
}

const initialStateForProductDetails = {
  product: {
    reviews: [],
  },
  loading: false,
  error: null,
}

const productDetailsRequest = (state) => ({
  ...state,
  loading: true,
})

const productDetailsSuccess = (state, payload) => ({
  ...state,
  loading: false,
  product: payload,
  error: null,
})
const productDetailsFail = (state, payload) => ({
  ...state,
  loading: false,
  error: payload,
})

export const productDetailsReducer = (
  state = initialStateForProductDetails,
  { type, payload = {} }
) => {
  switch (type) {
    case productConstants.PRODUCT_DETAILS_REQUEST:
      return productDetailsRequest(state)

    case productConstants.PRODUCT_DETAILS_SUCCESS:
      return productDetailsSuccess(state, payload)

    case productConstants.PRODUCT_DETAILS_FAIL:
      return productDetailsFail(state, payload)

    default:
      return state
  }
}
