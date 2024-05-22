import React, { useState } from 'react';
import './main.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        role: 'student', username: '', email: '', password: '', confirmPassword: '', otp: '',
    });

    const [errors, setErrors] = useState({});
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value,
        });
    };

    // Function to send OTP
    const handleSendOTP = async () => {
        if (!formData.email) {
            setErrors({ email: 'Email is required to send OTP' });
            return;
        }

        const apiUrl = 'https://sxs3330.uta.cloud/wdm/otp.php';
        const requestOptions = {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                action: 'create', email: formData.email,
            }),
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            const data = await response.json();

            if (response.ok) {
                setConfirmationMessage('OTP sent successfully.');
            } else {
                setErrorMessage(data.message || 'Failed to send OTP. Please try again.');
            }
        } catch (error) {
            setErrorMessage(`An error occurred: ${error.message}`);
        }
    };

    const handleVerifyOTP = async () => {
        const apiUrl = 'https://sxs3330.uta.cloud/wdm/otp.php';
        const requestOptions = {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                action: 'verify', email: formData.email, otp: formData.otp,
            }),
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            const data = await response.json();

            if (response.ok) {
                setConfirmationMessage('OTP verified successfully.');
                setOtpVerified(true);
            } else {
                setErrorMessage(data.message || 'Invalid OTP. Please try again.');
                setOtpVerified(false);
            }
        } catch (error) {
            setErrorMessage(`An error occurred: ${error.message}`);
            setOtpVerified(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        const { role, username, email, password, confirmPassword, otp } = formData;
        const newErrors = {};

        if (!role) {
            newErrors.role = 'Role is required';
        }

        if (!username) {
            newErrors.username = 'Username is required';
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!otpVerified) {
            setErrorMessage('Please verify the OTP first.');
            return;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const apiUrl = 'http://wdm.cloud.sxs3330.uta.cloud/api/login';
        const requestOptions = {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                role: formData.role,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
            }),
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            const data = await response.json();

            if (response.ok) {
                setConfirmationMessage('User successfully registered.');
                navigate('/login');
            } else {
                setErrorMessage(data.message || 'Failed to register. Please try again.');
            }
        } catch (error) {
            setErrorMessage(`An error occurred: ${error.message}`);
        }
    };

    return (<div>
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
            <h2>Create a New Account</h2>
            {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="role">Role:</label><br />
                <select id="role" name="role" onChange={handleInputChange} value={formData.role}>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="programcoordinator">Program Coordinator</option>
                    <option value="QA">QA Officer</option>
                    <option value="TA">TA</option>
                </select>
                <span className="error">{errors.role}</span><br /><br />

                {/* Username */}
                <label htmlFor="username">Username:</label><br />
                <input type="text" id="username" name="username" onChange={handleInputChange}
                    value={formData.username} required />
                <span className="error">{errors.username}</span><br /><br />

                {/* Email */}
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="email" onChange={handleInputChange} value={formData.email}
                    required />
                <span className="error">{errors.email}</span><br /><br />

                <button type="button" onClick={handleSendOTP}>
                    Send OTP
                </button>

                <label htmlFor="otp">Enter OTP:</label>
                <input
                    type="text"
                    id="otp"
                    name="otp"
                    onChange={handleInputChange}
                    value={formData.otp}
                    required
                />
                <span className="error">{errors.otp}</span>

                <button type="button" onClick={handleVerifyOTP}>
                    Verify OTP
                </button>

                {/* Password */}
                <label htmlFor="password">Password:</label><br />
                <input type="password" id="password" name="password" onChange={handleInputChange}
                    value={formData.password} required />
                <span className="error">{errors.password}</span><br /><br />

                {/* Confirm Password */}
                <label htmlFor="confirmPassword">Confirm Password:</label><br />
                <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleInputChange}
                    value={formData.confirmPassword} required />
                <span className="error">{errors.confirmPassword}</span><br /><br />

                <input type="submit" value="Register" />
            </form>
        </section>

        <footer>
            <p>Copyright &copy; 2023, All Rights Reserved.</p>
        </footer>
    </div>);
};

export default Register;

