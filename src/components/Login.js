import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // State to store the user's email and password
    const [email, setEmail] = React.useState('');  
    const [password, setPassword] = React.useState('');  
    const navigate = useNavigate();

    // Effect to check if the user is already logged in
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');  // Redirect to the homepage if the user is authenticated
        }
    }, [navigate]);  // Dependency array added to prevent unnecessary re-renders

    // Function to handle the login process
    const handleLogin = async () => {
        console.warn(email, password);

        // Make a POST request to the login API
        let result = await fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),  // Send the email and password in the request body
            headers: {
                'Content-Type': 'application/json'  // Set the content type to JSON
            }
        });

        result = await result.json();  // Parse the JSON response
        console.warn(result);

        if (result.name) {
            localStorage.setItem('user', JSON.stringify(result));  // Store user data in localStorage
            navigate('/');  // Redirect to the homepage upon successful login
        } else {
            alert("Invalid Email or Password");  // Show an error message for invalid credentials
        }
    };

    return (
        <div className='login'>
            <h1>Login</h1>
            <input
                type="text"
                className='inputbox'
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <input
                type="password"
                className='inputbox'
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    );
};

export default Login;
