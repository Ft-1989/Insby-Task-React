import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login(props) {

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

  const login = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/log-in', formData, {
      headers: {
        token: props.token,
      }
    })
      .then((response) => {
        sessionStorage.setItem('userData', JSON.stringify(response.data.data.data.customer))
        if (sessionStorage.getItem('userData')){
          props.setLoggedIn(true)
          navigate('/') 
        } 
      })
      .catch((error) => {
        console.error(error)
        alert('Pogresan unos');  
      });
  }  

  return(
    <div className="Login row align-items-center justify-content-center mx-auto ">
      <div className="col-6 d-none d-xl-block text-center">
        <img src="./images/login_image.png" alt="" />
      </div>
      <div className="col-12 col-xl-6 d-flex justify-content-center">
        <div className="flex-grow-1 px-4 px-sm-5">
          <div>
            <h1 className="text-center text-xl-start">Log in</h1>
          </div>       
          <form action="" method="post" onSubmit={login} className="d-flex flex-column gap-3 pt-5">
            <div className="d-flex flex-column gap-1">
              <label className="ms-2" htmlFor="login">Email</label>
              <input type="email" name="login" id="login" className="px-3 py-2" value={formData.login} onChange={handleInputChange} placeholder="Enter your email"/>
            </div>
            <div className="d-flex flex-column gap-1">
              <label className="ms-2" htmlFor="password">Create a password</label>
              <input type="password" name="password" id="password" className="px-3 py-2" value={formData.password} onChange={handleInputChange} placeholder="Enter your password"/>
            </div>
            <div>
              <input type="submit" className="px-3 py-2 w-100 mt-5" value="Log in" />  
            </div>      
          </form>
          <p className="text-center mt-4">Don't have an account? <Link to="/sign-up">Register</Link></p>
        </div>      
      </div>
    </div>
  );
}
export default Login;