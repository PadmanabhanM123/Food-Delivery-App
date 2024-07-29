import React ,{useState}from 'react';
// import { Link } from 'react-router-dom';
import '../Styles/HomePage.css'; // styling
import Login from '../Actions/Login';
import Register from '../Actions/Register';


const HomePage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Foodyy~Buddyy</h1>
      </header>
      {isRegistering ? (
        <Register setIsRegistering={setIsRegistering} />
      ) : (
        <Login setIsRegistering={setIsRegistering} />
      )}
    </div>
  );
};

export default HomePage;