import React from 'react';
import './main.css';
const ContactUs = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    return (
        <div>
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
                <h2>We'd Love to Hear from You</h2>
                <p>
                    Whether you have a question about our services, or anything else, our team is ready to answer all your questions.
                </p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label><br />
                    <input type="text" id="name" name="name" /><br /><br />

                    <label htmlFor="email">Email:</label><br />
                    <input type="email" id="email" name="email" /><br /><br />

                    <label htmlFor="message">Message:</label><br />
                    <textarea id="message" name="message" rows="4" cols="50"></textarea><br /><br />

                    <input type="submit" value="Submit" />
                </form>
            </section>

            <footer>
                <p>Copyright &copy; 2023, All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default ContactUs;