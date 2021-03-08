import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../Components/CheckoutSteps'
import Message from '../Components/Message'
import { checkoutOrder, checkoutReset } from '../actions/checkoutActions'
import Loader from '../Components/Loader'

const PlaceOrderScreen = () => {
	const { cartDetails, shippingAddress, billingAddress } = useSelector(
		(state) => state.cart
	)

	const { loading, checkoutData, error } = useSelector(
		(state) => state.checkout
	)

	const defaultImage = '/images/basin.png'
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(checkoutReset())
	}, [dispatch])

	const displayOrderedItems = () => {
		if (!cartDetails?.included?.items) {
			return (
				<Message>
					Your cart is empty <Link to='/'>Continue Shopping</Link>
				</Message>
			)
		} else {
			const orderedItems = cartDetails?.included?.items.map((item) => (
				<ListGroup.Item key={item?.product_id}>
					<Row>
						<Col md={3}>
							<Image src={defaultImage} alt={item?.name} fluid rounded />
						</Col>
						<Col>
							<Link to={`/product/${item?.product_id}`}>
								<h5>{item?.name}</h5>
								<p>{item?.sku}</p>
							</Link>
						</Col>
						<Col md={5}>
							{item?.quantity} units * &#163;{item?.unit_price?.amount} = &#163;
							{item?.value?.amount}
						</Col>
					</Row>
				</ListGroup.Item>
			))
			return orderedItems
		}
	}
	const placeOrderHandler = () => {
		dispatch(checkoutOrder())
	}
	return (
		<>
			{/* <CheckoutSteps step1 step2 step3 step4 /> */}
			{checkoutData?.data?.id ? (
				<h1>Order Details Page</h1>
			) : (
				<h1>Order Summary Page</h1>
			)}

			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						{checkoutData?.data?.id && (
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<h2>Order Details</h2>
									</ListGroup.Item>
									<ListGroup.Item className='bg-info text-white'>
										<Row>
											<Col>Order Id</Col>
											<Col>{checkoutData?.data?.id}</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Payment</Col>
											<Col>{checkoutData?.data?.payment}</Col>
										</Row>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						)}

						<ListGroup.Item>
							<h5>Shipping Details</h5>
							<p>
								<span className='font-weight-bold'>
									Shipping Address:&nbsp;&nbsp;
								</span>
								{shippingAddress.first_name} {shippingAddress.last_name},{' '}
								{shippingAddress.company_name}, {shippingAddress.line_1},{' '}
								{shippingAddress.line_2},{shippingAddress.city},{' '}
								{shippingAddress.county}, {shippingAddress.postCode},{' '}
								{shippingAddress.country}.
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h5>Billing Details</h5>
							<p>
								<span className='font-weight-bold'>
									Billing Address:&nbsp;&nbsp;
								</span>
								{billingAddress.first_name} {billingAddress.last_name},{' '}
								{billingAddress.company_name}, {billingAddress.line_1},{' '}
								{billingAddress.line_2},{billingAddress.city},{' '}
								{billingAddress.county}, {billingAddress.postCode},{' '}
								{billingAddress.country}.
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<ListGroup variant='flush'>
								<h5>Order Items</h5>
								{displayOrderedItems()}
							</ListGroup>
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Price of Items</Col>
									<Col>
										&#163;
										{
											cartDetails?.data?.meta?.display_price?.without_tax
												?.amount
										}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>
										&#163; {cartDetails?.data?.meta?.display_price?.tax?.amount}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>
										&#163;{' '}
										{cartDetails?.data?.meta?.display_price?.with_tax?.amount}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{checkoutData?.data?.id ? (
									<Message variant='success'>Order Placed Successfully</Message>
								) : (
									<Button
										type='button'
										className='btn-block'
										onClick={placeOrderHandler}
									>
										{loading ? <Loader buttonLoader /> : 'Place Order'}
									</Button>
								)}
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
