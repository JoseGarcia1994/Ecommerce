import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from "react-hook-form"
import axios from 'axios';
import {setIsLoading} from "../store/slices/isLoading.slice"
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {

	const { register, handleSubmit } = useForm()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const submit = data => {
		dispatch( setIsLoading( true ))
		axios
				.post(`https://e-commerce-api-v2.academlo.tech/api/v1/users/login`, data )
				.then( resp => {
					console.log(resp.data)
					localStorage.setItem( "token", resp.data.token )
					navigate("/")
				})
				.catch( error => { 
					if (error.response.staus === 401) {
						alert("wrong credentials")
					}
					console.error(error)
				})
				.finally( () => dispatch( setIsLoading(false)))
	}
	return (
		<div className='py-5 mt-5 d-flex justify-content-center align-center'>
			<Form onSubmit={handleSubmit(submit)} className='p-3 px-5' style={{ border: "1px solid black" }}>
				<h1 className='text-center'>Log in</h1>
				
				<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
					<Form.Label>
						Email
					</Form.Label>
					<Form.Control
					type="email"
					placeholder="Email"
					{...register("email")}
					/>
				</Form.Group>

				<Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
					<Form.Label>
						Password
					</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							{...register("password")}
						/>
				</Form.Group>

				<Form.Group as={Row} className="mb-3">
					<Col sm={{ span: 10, offset: 2 }}>
						<Button type="submit">Log in</Button>
					</Col>
				</Form.Group>
			</Form>
		</div>
	);
};

export default Login;