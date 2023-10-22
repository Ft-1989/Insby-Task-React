import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Components/Card';
import { Link, Route, Routes } from "react-router-dom";
import SignUp from './Components/SignUp';
import Login from './Components/Login';

function App() {

  const [token, setToken] = useState();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if(sessionStorage.getItem('userData')) setLoggedIn(true)
    axios.post('http://localhost:3001/api/token')
    .then((response) =>{
      const responseData = response.data;
      setToken(responseData.data.token)
      axios.get('http://localhost:3001/api/products', {
        headers: {
          token : responseData.data.token
        }
      })
        .then((response) =>{
          setProductList(response.data.data)
          setLoading(false);
        })
    })
    .catch((error) => console.error(error));
    
  }, [])


  const products = productList.length > 0 ? (
    productList.map((item) => (
      <Card 
        key={item.id}
        name={item.title}
        description={item.body}
        price={item.prices[0].price}
        memberPrice={item.prices[0].member_price}
        image={item.image_url}
        loggedIn={loggedIn}
      />
    ))
  ) : (
    <p>No products available.</p>
  );

  const logOut = () => {
    sessionStorage.removeItem('userData')
    setLoggedIn(false)
  }

  return(
    
    <div className="App">
      <Routes >
        <Route 
          path='/' 
          element={
            <>
              <nav className='container d-flex justify-content-end gap-3 py-3'>
                {
                  !loggedIn ? (
                    <>
                      <Link to="/sign-up">Sign up</Link>
                      <Link to="/log-in">Log in</Link>
                    </>                 
                  ) : (
                    <button onClick={logOut}>Log out</button>
                  )
                }            
              </nav>
              <div className="container">
                {loading ? 
                ( <p>Loading...</p> ) : ( 
                <div className="Cards d-flex flex-column gap-5 py-5">
                  {products}
                </div> )}
              </div>  
            </>
          }

        />      
        <Route 
          path='/sign-up' 
          element={
            <>
              <SignUp 
                token={token}
              />
            </>
          }
        />
        <Route 
          path='/log-in' 
          element={
            <>
              <Login
                token={token}
                setLoggedIn={setLoggedIn}
              />
            </>
          }
        />

      </Routes>
    </div>
  )
}

export default App;
