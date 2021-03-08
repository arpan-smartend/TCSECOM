import React, { useState, useEffect, useCallback } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { userDetails } from '../actions/userActions'
import { useLocation, useHistory } from 'react-router-dom'

const ProfileScreen = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [name, setName] = useState('')
	const [message, setMessage] = useState(null)

	const dispatch = useDispatch()
	const location = useLocation()
	const history = useHistory()

	const { loading, error, user } = useSelector((state) => state.userDetails)

	const { userInfo } = useSelector((state) => state.userLogin)

	const redirectIfUserNotLoggedIn = useCallback(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user) {
				dispatch(userDetails('profile'))
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [history, userInfo, dispatch, user])

	useEffect(() => redirectIfUserNotLoggedIn(), [redirectIfUserNotLoggedIn])

	const submitHandler = useCallback(
		(e) => {
			e.preventDefault()
			if (password !== confirmPassword) {
				setMessage('Passwords do not match')
			} else {
				setMessage(null)
				//Dispatch update profile
			}
		},
		[password, confirmPassword]
	)

	return (
		<Row>
			<Col md={3}>
				<h2>My Profile</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{loading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter your Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='email'>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='email'
							placeholder='Enter your Email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter your Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId='confirmpassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm Password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	)
}

export default ProfileScreen
