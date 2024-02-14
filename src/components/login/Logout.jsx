import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const Logout = () => {
  const navigate = useNavigate()

  const logout = () => {
		localStorage.clear()
		navigate("/")
	}

  return (
    <div className='logout-container'>
      <div className='logout-info'>
        <h1>Log out</h1>
        <h2>Hope to see you soon!</h2>
      </div>
      <Button
        type="submit"
        variant='dark'
        onClick={() => logout()}>
        Log out
      </Button>
    </div>
  );
};

export default Logout;