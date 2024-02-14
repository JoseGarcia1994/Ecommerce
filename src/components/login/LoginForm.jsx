import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { setIsLoading } from '../../store/slices/isLoading.slice.jsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

const LoginForm = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch();
	const navigate = useNavigate();

  const submit = data => {
    dispatch(setIsLoading(true))
    
    axios
      .post(`https://e-commerce-api-v2.academlo.tech/api/v1/users/login`, data)
      .then(resp => {
        localStorage.setItem("token", resp.data.token)
        navigate("/")
      })
      .catch(error => {
        if (error.response.staus === 401) {
          alert("wrong credentials")
        }
        console.error(error)
      })
      .finally(() => dispatch(setIsLoading(false)))
  }

  return (
    <Form onSubmit={handleSubmit(submit)} className='p-3 px-5 login-container'>
      <h1 className='text-center'>Log in</h1>

      <div className='log__in-credentials'>
        <h2 className='log__in-title'>Testing</h2>
        <p className='log__in-email'>email: <span>john@gmail.com</span></p>
        <p className='log__in-password'>password: <span>john1234</span></p>
      </div>

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

      <Form.Group as={Row} className="mb-3 login-btn-container">
        <Button 
          type="submit" 
          variant='dark' 
          className='login-btn'>
            Log in
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LoginForm;