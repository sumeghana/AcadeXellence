import React from 'react';
import './main.css';

const HomePage = () => {
    return (
        <>
            {/* Navigation Bar */}
            <nav>
                <ul>
                    <li><a href="#">Homepage</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Login</a></li>
                    <li><a href="#">Register</a></li>
                    <li><a href="#">Users</a></li>
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
                    <a href="#">Instructor</a>
                </article>
                <article className="feature-card">
                    <a href="#">Admin</a>
                </article>
                <article className="feature-card">
                    <a href="#">Program Coordinator</a>
                </article>
                <article className="feature-card">
                    <a href="#">Quality Assurance Officer</a>
                </article>
                <article className="feature-card">
                    <a href="#">Student</a>
                </article>
            </section>

            <footer>
                <p>Copyright &copy; 2023, All Rights Reserved.</p>
            </footer>
        </>
    );
};

export default HomePage;
