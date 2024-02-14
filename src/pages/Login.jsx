import LoginForm from '../components/login/LoginForm.jsx';
import Logout from '../components/login/Logout.jsx';

const Login = () => {

	return (
		<div className='py-5 mt-5 d-flex justify-content-center align-center'>
			{
				!localStorage.token ? <LoginForm />  : <Logout />
			}
		</div>
	);
};

export default Login;