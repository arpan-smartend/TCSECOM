import React, { useState, useCallback, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { saveAddress } from '../actions/cartActions'
import CheckoutSteps from '../Components/CheckoutSteps'

const ShippingScreen = () => {
	const { shippingAddress, billingAddress } = useSelector((state) => state.cart)
	const [sameAddressBillingShipping, setSameAddressBillingShipping] = useState(
		false
	)
	const [firstNameShipping, setFirstNameShipping] = useState(
		shippingAddress?.firstName ?? ''
	)
	const [lastNameShipping, setLastNameShipping] = useState(
		shippingAddress?.lastName ?? ''
	)
	const [companyNameShipping, setCompanyNameShipping] = useState(
		shippingAddress?.companyName ?? ''
	)
	const [addressLineOneShipping, setAddressLineOneShipping] = useState(
		shippingAddress?.addressLineOne ?? ''
	)
	const [addressLineTwoShipping, setAddressLineTwoShipping] = useState(
		shippingAddress?.addressLineTwo ?? ''
	)
	const [cityShipping, setCityShipping] = useState(shippingAddress?.city ?? '')
	const [countyShipping, setCountyShipping] = useState(
		shippingAddress?.county ?? ''
	)
	const [postCodeShipping, setPostCodeShipping] = useState(
		shippingAddress?.postCode ?? ''
	)
	const [countryShipping, setCountryShipping] = useState(
		shippingAddress?.country ?? ''
	)

	const [firstNameBilling, setFirstNameBilling] = useState(
		billingAddress?.firstName ?? ''
	)
	const [lastNameBilling, setLastNameBilling] = useState(
		billingAddress?.lastName ?? ''
	)
	const [companyNameBilling, setCompanyNameBilling] = useState(
		billingAddress?.companyName ?? ''
	)
	const [addressLineOneBilling, setAddressLineOneBilling] = useState(
		billingAddress?.addressLineOne ?? ''
	)
	const [addressLineTwoBilling, setAddressLineTwoBilling] = useState(
		billingAddress?.addressLineTwo ?? ''
	)
	const [cityBilling, setCityBilling] = useState(billingAddress?.city ?? '')
	const [countyBilling, setCountyBilling] = useState(
		billingAddress?.county ?? ''
	)
	const [postCodeBilling, setPostCodeBilling] = useState(
		billingAddress?.postCode ?? ''
	)
	const [countryBilling, setCountryBilling] = useState(
		billingAddress?.country ?? ''
	)

	const history = useHistory()

	const dispatch = useDispatch()

	useEffect(() => {
		if (sameAddressBillingShipping) {
			setFirstNameBilling(firstNameShipping)
			setLastNameBilling(lastNameShipping)
			setCompanyNameBilling(companyNameShipping)
			setAddressLineOneBilling(addressLineOneShipping)
			setAddressLineTwoBilling(addressLineTwoShipping)
			setCityBilling(cityShipping)
			setCountyBilling(countyShipping)
			setPostCodeBilling(postCodeShipping)
			setCountryBilling(countryShipping)
		} else {
			setFirstNameBilling('')
			setLastNameBilling('')
			setCompanyNameBilling('')
			setAddressLineOneBilling('')
			setAddressLineTwoBilling('')
			setCityBilling('')
			setCountyBilling('')
			setPostCodeBilling('')
			setCountryBilling('')
		}
	}, [
		sameAddressBillingShipping,
		firstNameShipping,
		lastNameShipping,
		companyNameShipping,
		addressLineOneShipping,
		addressLineTwoShipping,
		cityShipping,
		countyShipping,
		postCodeShipping,
		countryShipping
	])

	const submitHandler = useCallback(
		(e) => {
			e.preventDefault()
			dispatch(
				saveAddress(
					{
						first_name: firstNameShipping,
						last_name: lastNameShipping,
						company_name: companyNameShipping,
						line_1: addressLineOneShipping,
						line_2: addressLineTwoShipping,
						city: cityShipping,
						county: countyShipping,
						postcode: postCodeShipping,
						country: countryShipping
					},
					{
						first_name: firstNameBilling,
						last_name: lastNameBilling,
						company_name: companyNameBilling,
						line_1: addressLineOneBilling,
						line_2: addressLineTwoBilling,
						city: cityBilling,
						county: countyBilling,
						postcode: postCodeBilling,
						country: countryBilling
					}
				)
			)
			history.push('/placeOrder')
		},
		[
			dispatch,
			history,
			firstNameShipping,
			lastNameShipping,
			companyNameShipping,
			addressLineOneShipping,
			addressLineTwoShipping,
			cityShipping,
			countyShipping,
			postCodeShipping,
			countryShipping,
			firstNameBilling,
			lastNameBilling,
			companyNameBilling,
			addressLineOneBilling,
			addressLineTwoBilling,
			cityBilling,
			countyBilling,
			postCodeBilling,
			countryBilling
		]
	)

	return (
		<>
			{/* <CheckoutSteps step1 step2 /> */}
			<h1>Address Details</h1>
			<Row>
				<Col md={4}>
					<h5>Shipping</h5>
					<Form>
						<Form.Group controlId='firstName'>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your First Name'
								value={firstNameShipping}
								required
								onChange={(e) => setFirstNameShipping(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='lastName'>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your Last Name'
								value={lastNameShipping}
								required
								onChange={(e) => setLastNameShipping(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='companyName'>
							<Form.Label>Company Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your Company Name'
								value={companyNameShipping}
								required
								onChange={(e) => setCompanyNameShipping(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='addressLineOne'>
							<Form.Label>Address Line One</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your Address Line One'
								value={addressLineOneShipping}
								required
								onChange={(e) => setAddressLineOneShipping(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='addressLineTwo'>
							<Form.Label>Address Line Two</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your Address Line Two'
								value={addressLineTwoShipping}
								onChange={(e) => setAddressLineTwoShipping(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='city'>
							<Form.Label>City</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your City'
								value={cityShipping}
								required
								onChange={(e) => setCityShipping(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='county'>
							<Form.Label>County</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your County'
								value={countyShipping}
								required
								onChange={(e) => setCountyShipping(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='postalCode'>
							<Form.Label>Postal Code</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your Postal Code'
								value={postCodeShipping}
								required
								onChange={(e) => setPostCodeShipping(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='country'>
							<Form.Label>Country</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your Country'
								value={countryShipping}
								required
								onChange={(e) => setCountryShipping(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Form>
				</Col>
				<Col></Col>
				<Col md={4}>
					<h5>Billing</h5>
					<Form>
						<Form.Group controlId='firstName'>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your First Name'
								value={firstNameBilling}
								required
								onChange={(e) => setFirstNameBilling(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='lastName'>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your Last Name'
								value={lastNameBilling}
								required
								onChange={(e) => setLastNameBilling(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='companyName'>
							<Form.Label>Company Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your Company Name'
								value={companyNameBilling}
								required
								onChange={(e) => setCompanyNameBilling(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='addressLineOne'>
							<Form.Label>Address Line One</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your Address Line One'
								value={addressLineOneBilling}
								required
								onChange={(e) => setAddressLineOneBilling(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='addressLineTwo'>
							<Form.Label>Address Line Two</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your Address Line Two'
								value={addressLineTwoBilling}
								onChange={(e) => setAddressLineTwoBilling(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='city'>
							<Form.Label>City</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your City'
								value={cityBilling}
								required
								onChange={(e) => setCityBilling(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='county'>
							<Form.Label>County</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your County'
								value={countyBilling}
								required
								onChange={(e) => setCountyBilling(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='postalCode'>
							<Form.Label>Postal Code</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your Postal Code'
								value={postCodeBilling}
								required
								onChange={(e) => setPostCodeBilling(e.target.value)}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='country'>
							<Form.Label>Country</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter your Country'
								value={countryBilling}
								required
								onChange={(e) => setCountryBilling(e.target.value)}
							></Form.Control>
						</Form.Group>
					</Form>
				</Col>
			</Row>
			<Row className='mt-3'>
				<Col>
					<Form>
						<Form.Check
							type='checkbox'
							label='Billing Address same as Shipping Address'
							id='checkForSameAddress'
							name='SameAddressBillingShipping'
							checked={sameAddressBillingShipping}
							onChange={(e) => {
								setSameAddressBillingShipping(e.target.checked)
							}}
						></Form.Check>
					</Form>
					<Button
						type='button'
						className='btn-block'
						variant='primary'
						onClick={submitHandler}
					>
						Continue
					</Button>
				</Col>
			</Row>
		</>
	)
}

export default ShippingScreen
