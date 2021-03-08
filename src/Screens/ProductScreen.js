import React, { useState, useEffect, useCallback } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { listProductDetail } from '../actions/productActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

const ProductScreen = () => {
	const [qty, setQty] = useState(1)
	const { id } = useParams()
	const history = useHistory()
	const dispatch = useDispatch()
	const defaultImage = '/images/basin.png'

	const fetchProductDetail = useCallback(
		() => dispatch(listProductDetail(id)),
		[dispatch, id]
	)

	const { loading, product, error } = useSelector(
		(state) => state.productDetails
	)

	const [gbpPrice, usdPrice] = product?.price || [0, 0]

	useEffect(() => {
		fetchProductDetail()
	}, [fetchProductDetail])

	const addToCartHandler = (event) => {
		event.preventDefault()
		history.push({
			pathname: `/cart/${id}`,
			search: `?qty=${qty}`
		})
	}

	return (
		<>
			{/* <Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link> */}
			<h1>Product Details Page</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Row>
					<Col md={6}>
						<Image
							src={product?.image ?? defaultImage}
							alt={product?.name}
							fluid
						/>
					</Col>
					<Col md={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h3>{product?.name}</h3>
								<p>{product?.sku}</p>
							</ListGroup.Item>
							<ListGroup.Item>
								Description: {product?.description}
							</ListGroup.Item>
							<ListGroup.Item>
								<Message
									variant={
										product?.purchasableHomeDelivery ? 'success' : 'danger'
									}
								>
									{product?.purchasableHomeDelivery ? (
										<i className='fas fa-check-circle'></i>
									) : (
										<i className='fas fa-ban'></i>
									)}
									&nbsp;&nbsp;Purchasable as Home Delivery
								</Message>
								<Message
									variant={
										product?.purchasableAsClickCOllect ? 'success' : 'danger'
									}
								>
									{product?.purchasableAsClickCOllect ? (
										<i className='fas fa-check-circle'></i>
									) : (
										<i className='fas fa-ban'></i>
									)}
									&nbsp;&nbsp;Purchasable as Click and Collect
								</Message>
							</ListGroup.Item>
							<ListGroup.Item>Price: &#163; {gbpPrice.amount} </ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={3}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<Row>
										<Col>Price:</Col>
										<Col>
											<strong> &#163; {gbpPrice.amount}</strong>
										</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Status:</Col>
										<Col>{product?.meta?.stock?.availability}</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Row>
										<Col>Qty</Col>
										<Col>
											<Form.Control
												type='number'
												placeholder='Qty'
												value={qty}
												onChange={(e) => setQty(e.target.value)}
											></Form.Control>
										</Col>
									</Row>
								</ListGroup.Item>

								<ListGroup.Item>
									<Button
										onClick={addToCartHandler}
										className='btn-block'
										type='button'
									>
										Add to Cart
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</>
	)
}

export default ProductScreen
