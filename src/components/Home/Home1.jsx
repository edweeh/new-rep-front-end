import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Home.css';
import NavBar from './Navbar';
import baseUrl from '../../Api';
import Imgslider from './Imgslider';

const Home1 = () => {
  const [petList, setPetList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const getToken = () => {
        return localStorage.getItem('token');
    };

    const token = getToken();
    if (!token) {
        navigate('/login');
    } else {
        console.log('Token fetched:', token);
        const payload = token.split('.')[1];
        console.log('Token Payload:', payload); // Log the token payload for debugging
        try {
            const decodedPayload = atob(payload);
            console.log('Decoded Payload:', decodedPayload); // Log the decoded payload for debugging
            
            // Extract 'id' as 'userId' and 'username' from decoded payload
            const { id: userId, username: decodedUsername } = JSON.parse(decodedPayload);
            console.log('User Id:', userId); // Log the extracted user ID for debugging
            console.log('Username:', decodedUsername); // Log the extracted username for debugging
            
            // Set the extracted username to the state variable
            setUsername(decodedUsername);
            
            // Optionally, you can also set the email state variable if it's available in the payload
            // setEmail(decodedEmail);
        } catch (error) {
            console.error('Error decoding token payload:', error);
        }
    }
}, []);

  const handleSearch = () => {
    axios
      .get(baseUrl + `/pet/tsearch/${searchTerm}`)
      .then((response) => {
        console.log(response.data);
        setPetList(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAddToCart = (pet) => {
    addToCart(pet);
    console.log('Adding pet to cart:', pet);
    navigate('/cart');
  };

  return (
    <div className="home-page">
      <NavBar />
      <Imgslider/>
      
      <div className="welcome-section">
        <h1>Welcome {username} to PAWSHUB</h1>
        <p>Find your new furry friend with us!</p>
      </div>

      <div className="featured-pets-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <h2>Featured Pets</h2>
        <div className="featured-pets">
          {petList.length > 0 ? (
            petList.map((pet) => (
              <div key={pet.id} className="featured-pet-card">
                <img src={`data:${pet.Image.contentType};base64,${pet.Image.data}`} alt="petImage" />
                <h3>{pet.PetName}</h3>
                <p>{pet.Breed}</p>
                <button onClick={() => handleAddToCart(pet)}>Add to Cart</button>
                <br></br>
                <br></br>
                <br></br>
                <button>View Details</button>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home1;
