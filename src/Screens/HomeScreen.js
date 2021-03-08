import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../Components/Product'
import { listProducts } from '../actions/productActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { useHistory } from 'react-router-dom'

const HomeScreen = () => {
	const dispatch = useDispatch()
	const fetchProducts = useCallback(() => dispatch(listProducts()), [dispatch])
	const { loading, products, error } = useSelector((state) => state.productList)

	const history = useHistory()
	useEffect(() => {
		history.push('/product/fc098e0d-bb0e-4feb-9f92-3ccdb91ccd61')
		fetchProducts()
	}, [fetchProducts, history])

	const displayProducts = products.map((item) => (
		<Col sm={12} md={6} lg={4} xl={3} key={item._id}>
			<Product product={item} />
		</Col>
	))

	return (
		<>
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>{displayProducts}</Row>
			)}
		</>
	)
}

export default HomeScreen
