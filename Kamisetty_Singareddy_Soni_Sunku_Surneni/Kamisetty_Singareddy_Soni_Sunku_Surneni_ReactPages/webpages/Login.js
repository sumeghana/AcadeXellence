import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './main.css';
import axios from 'axios';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState(null);

    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password } = formData;

        if (!username || !password) {
            console.log("Both fields are required");
            setErrorMessage("Both fields are required");
            return;
        }

        try {
            const response = await axios.post('http://wdm.cloud.sxs3330.uta.cloud/api/login', {
                username,
                password
            });

            if (response.data.status === 'success') {
                localStorage.setItem("userId", response.data.id);

                navigate(`/${response.data.role}-dashboard`);
            } else {
                setErrorMessage('Invalid credentials');
                setErrorMessage(response.data.message);

            }
        } catch (error) {
            setErrorMessage('API Error. Please try again later.');
        }
    };
    return (
        <>
            <nav>
                <ul>
                    <li><a href="/homepage">Homepage</a></li>
                    <li><a href="/contact-us">Contact Us</a></li>
                    <li><a href="/about-us">About Us</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                </ul>
            </nav>

            <section>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label><br />
                    <input type="text" id="username" name="username" required onChange={handleChange} /><br /><br />

                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" name="password" required onChange={handleChange} /><br /><br />

                    <input type="submit" value="Login" />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                </form>
                <p><a href="/register">Register</a></p>
                <p><a href="/forgot-password">Forgot Password?</a></p>
            </section>

            <footer>
                <p>Copyright &copy; 2023, All Rights Reserved.</p>
            </footer>
        </>
    );
};

export default Login;
