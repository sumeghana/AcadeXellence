import React from 'react';
import './main.css';

const ForgotPassword = () => {
    return (
        <div>
            <nav>
                <div id="logo">Logo</div>
                <ul>
                    <li><a href="homepage.html">Homepage</a></li>
                    <li><a href="contact_us.html">Contact Us</a></li>
                    <li><a href="about_us.html">About Us</a></li>
                    <li><a href="login.html">Login</a></li>
                    <li><a href="register.html">Register</a></li>
                </ul>
            </nav>

            <section>
                <h2>Reset Password</h2>
                <form action="#" method="post">
                    <label htmlFor="email">Email:</label><br />
                    <input type="email" id="email" name="email" required /><br /><br />

                    <label htmlFor="new-password">New Password:</label><br />
                    <input type="password" id="new-password" name="new-password" required /><br /><br />

                    <label htmlFor="confirm-password">Confirm Password:</label><br />
                    <input type="password" id="confirm-password" name="confirm-password" required /><br /><br />

                    <input type="submit" value="Reset Password" />
                </form>
                <p><a href="/login">Back to Login</a></p>
            </section>

            <footer>
                <p>Copyright &copy; 2023, All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default ForgotPassword;
