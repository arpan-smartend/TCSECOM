import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useHistory, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {
	addToCart,
	removeFromCart,
	createGetCart
} from '../actions/cartActions'

const CartScreen = () => {
	const { id: productId } = useParams()
	const { search } = useLocation()
	const qty = search ? Number(search.split('=')[1]) : 1
	const history = useHistory()
	const dispatch = useDispatch()
	const { cartDetails, loading } = useSelector((state) => state.cart)
	const type = 'cart_item'
	const defaultImage = '/images/basin.png'

	const fetchCart = useCallback(() => dispatch(createGetCart()), [dispatch])

	const addToCartAction = useCallback(() => {
		if (productId) {
			dispatch(addToCart(productId, type, qty))
		}
	}, [dispatch, productId, qty])

	useEffect(() => {
		addToCartAction()
		fetchCart()
	}, [addToCartAction, fetchCart])

	const removeProductHandler = useCallback(
		(productId) => {
			dispatch(removeFromCart(productId))
		},
		[dispatch]
	)

	const checkoutHandler = useCallback(() => {
		history.push('/login?redirect=shipping')
	}, [history])

	const displayItems = () => {
		if (!cartDetails?.included?.items) {
			if (!loading) {
				return (
					<Message>
						Your cart is empty <Link to='/'>Continue Shopping</Link>
					</Message>
				)
			} else {
				return <Loader />
			}
		} else {
			const cartItemsList = cartDetails?.included?.items.map((item) => (
				<ListGroup.Item key={item?.product_id}>
					<Row>
						<Col md={2}>
							<Image src={defaultImage} alt={item?.name} fluid rounded />
						</Col>
						<Col md={3}>
							<Link to={`/product/${item?.product_id}`}>
								<h5>{item?.name}</h5>
								<p>{item?.sku}</p>
							</Link>
						</Col>
						<Col md={2}>&#163;{item?.unit_price?.amount}</Col>
						<Col md={2}>{item?.quantity} units</Col>
						<Col md={2}>
							<Button
								type='button'
								variant='light'
								onClick={() => removeProductHandler(item.product)}
							>
								<i className='fas fa-trash'></i>
							</Button>
						</Col>
					</Row>
				</ListGroup.Item>
			))
			return <ListGroup variant='flush'>{cartItemsList}</ListGroup>
		}
	}

	const displayCartSummary = () => {
		if (!cartDetails?.included?.items) {
			return
		}
		const totalItems = cartDetails?.included?.items.reduce(
			(acc, currentItem) => acc + currentItem.quantity,
			0
		)
		const totalPrice = cartDetails?.data?.meta?.display_price?.with_tax?.amount

		return (
			<Card>
				<ListGroup variant='flush'>
					<ListGroup.Item>
						<h2>Subtotal ({totalItems}) items</h2>
						<p>Total: {totalPrice}</p>
					</ListGroup.Item>
					<ListGroup.Item>
						<Button
							type='button'
							className='btn-block'
							onClick={checkoutHandler}
						>
							Proceed To Checkout
						</Button>
					</ListGroup.Item>
				</ListGroup>
			</Card>
		)
	}

	return (
		<>
			<h1>Shopping Cart</h1>
			<Row>
				<Col md={8}>{displayItems()}</Col>
				<Col md={4}>{displayCartSummary()}</Col>
			</Row>
		</>
	)
}

export default CartScreen
