import React from 'react';
import './main.css'; // Make sure the path is correct

const HomePage = () => {
    return (
        <div>
            {/* Navigation Bar */}
            <nav>
                <ul>
                    {/* React Router Links would go here, or whatever you use for navigation */}
                    <li><a href="/homepage">Homepage</a></li>
                    <li><a href="/contact-us">Contact Us</a></li>
                    <li><a href="/about-us">About Us</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>
                    <li><a href="https://sxs7311.uta.cloud/blog/">Blog</a></li>
                </ul>
            </nav>

            {/* Hero Section */}
            <section id="hero">
                <h1>Welcome</h1>
                <p>Revolutionizing the way you experience courses</p>
            </section>

            {/* Features */}
            <section id="features">
                <article className="feature-card">
                    <h2>Speed</h2>
                    <p>Experience lightning-fast load times.</p>
                </article>
                <article className="feature-card">
                    <h2>Security</h2>
                    <p>Your data is our top priority.</p>
                </article>
                <article className="feature-card">
                    <h2>Flexibility</h2>
                    <p>Customizable solutions for everyone.</p>
                </article>
            </section>

            <footer>
                <p>&copy; 2023 YourCompany. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
