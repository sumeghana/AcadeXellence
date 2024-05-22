import React from 'react';
import '../webpages/main.css';

const AboutUs = () => {
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
                <h2>About Us</h2>
                <p>
                    Our team is dedicated to pushing the boundaries of what technology can do. Our mission
                    is to enhance the everyday lives of people around the globe. We are committed to maintaining the highest
                    level of excellence in all we do, whether it’s our cutting-edge products or our industry-leading customer
                    service.
                </p>
                <p>
                    Our team consists of professionals from diverse backgrounds, united in our passion for innovation. From
                    software development to design, from analytics to customer service, each member of our team plays a vital
                    role in our success.
                </p>
                <p>
                    We believe in the transformative power of technology and are constantly striving to bring our vision for a
                    better future to reality. Thank you for being a part of our journey.
                </p>
            </section>

            <footer>
                <p>Copyright &copy; 2023, All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default AboutUs;