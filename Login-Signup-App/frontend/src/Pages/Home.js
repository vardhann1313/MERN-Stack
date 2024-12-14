import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState();
  const navigate = useNavigate();

// ------------------ Setting username --------------
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser')
    setLoggedInUser(user);
  }, [])
// ------------------ Logout function ---------------
  const handleLogout = (e) => {
    localStorage.removeItem('loggedInUser')
    localStorage.removeItem('jwtToken')

    handleSuccess('Logging out ...')
    
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }
// ---------------------------------------------------
// -------------- Get products function --------------
const getProducts = async () => {
    try {
      const url = 'http://localhost:8080/products'
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('jwtToken')
        }
      }

      const response = await fetch(url, headers)
      const result = await response.json()

      handleSuccess('Getting products ..')
      setProducts(result)
      
    } catch (error) {
      handleError(error)
    }
}
// ---------------------------------------------------
  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={getProducts} >Get products</button>
      <button onClick={handleLogout} >Logout</button>

      <div>
          {
            products?.map((item, index) => (
              <ul key={index}>
                <span>{item.name} : {item.price}</span>
              </ul>
            ))
          }
      </div>

      <ToastContainer />
    </div>
  )
}

export default Home