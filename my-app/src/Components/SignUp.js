import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function SignUp(props) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    autoRegister: true,
    login: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signUp = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/sign-up', formData, {
      headers: {
        token: props.token,
      }
    })
      .then((response) => {
        navigate('/log-in')
      })
      .catch((error) => {
        console.error(error)
        alert('Pogresan unos');  
      });
  }  


  return(
    <div className="SignUp container row align-items-center justify-content-center mx-auto ">
      <div className="col-6 d-none d-xl-block text-center">
        <img src="https://files.insby.tech/test/static/signup_image.png" alt="" />
      </div>
      <div className="col-12 col-xl-6">
        <div className="text-center mb-5">
          <h1>Sign up</h1>
          <p>Enter your details to get started</p>
        </div>       
        <form action="" method="post" onSubmit={signUp} className="d-flex flex-column gap-3 pt-5">
          <div className="d-flex flex-column gap-1">
            <label className="ms-2" htmlFor="login">Email</label>
            <input type="email" name="login" id="login" className="px-3 py-2" value={formData.login} onChange={handleInputChange} placeholder="Enter your email addres"/>
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="ms-2" htmlFor="password">Create a password</label>
            <input type="password" name="password" id="password" className="px-3 py-2" value={formData.password} onChange={handleInputChange} placeholder="Enter a strong password"/>
          </div>
          <div className="d-flex flex-column gap-1">
            <label className="ms-2" htmlFor="confirmPassword">Confirm password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" className="px-3 py-2" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm your password"/>
          </div>
          <div>
            <input type="submit" className="px-3 py-2 w-100 mt-5" value="Sign up" />  
          </div>      
        </form>
        <p className="text-center mt-4">Already have an account? <Link to="/log-in">Log in</Link></p>
      </div>
    </div>
  );
}
export default SignUp;