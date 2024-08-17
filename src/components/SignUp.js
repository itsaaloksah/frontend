import React, { useEffect, useState } from "react";  // Importing React and necessary hooks
import { useNavigate } from "react-router-dom";  // Importing useNavigate hook for navigation

const SignUp = () => {
    // State hooks to manage input fields' values
    const [name, setName] = useState("");  // State for the user's name
    const [email, setEmail] = useState("");  // State for the user's email
    const [password, setPassword] = useState("");  // State for the user's password
    const navigate = useNavigate();  // Hook to navigate programmatically

    // useEffect hook to check if the user is already logged in
    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/");  // Redirect to the home page if the user is already authenticated
        }
    }, [navigate]);  // Added dependency array to prevent unnecessary re-renders

    // Function to collect and send data to the backend
    const collectData = async () => {
        console.warn(name, email, password);  // Logging the current state values to the console

        // Making a POST request to the backend to register a new user
        let result = await fetch('http://localhost:5000/register', {
            method: 'POST',  // Setting the HTTP method to POST
            body: JSON.stringify({ name, email, password }),  // Sending the state values as JSON in the request body
            headers: {
                'Content-Type': 'application/json'  // Setting the Content-Type header to indicate JSON data
            }
        });

        result = await result.json();  // Parsing the JSON response from the server
        console.warn(result);  // Logging the server response to the console
        localStorage.setItem("user", JSON.stringify(result));  // Storing the user data in localStorage

        if (result) {  // If the registration is successful, navigate to the home page
            navigate('/');
        }
    };

    return (
        <div className="register">
            <h1>Register</h1>

            {/* Input field for the user's name */}
            <input
                className="inputbox"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
            />

            {/* Input field for the user's email */}
            <input
                className="inputbox"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
            />

            {/* Input field for the user's password */}
            <input
                className="inputbox"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
            />

            {/* Button to trigger the collectData function when clicked */}
            <button onClick={collectData} className="appButton" type="button">
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;  // Exporting the SignUp component for use in other parts of the applications
