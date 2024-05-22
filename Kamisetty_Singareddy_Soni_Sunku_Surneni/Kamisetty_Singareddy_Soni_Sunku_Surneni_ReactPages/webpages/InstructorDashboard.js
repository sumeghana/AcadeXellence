import React from 'react';
import './main.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


const InstructorDashboard = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId"); // Retrieve the ID from local storage

                const payload = {
                    action: "view",
                };

                const response = await axios.post(`https://sxs3330.uta.cloud/wdm/Users.php?id=${userId}`, payload);

                if (response.data && response.data.user) {
                    setUserData(response.data.user);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <nav id="top-navbar">
                <h1>Instructor Dashboard</h1>
            </nav>

            <div id="wrapper">
                {/* Side Navigation */}
                <div id="sidebar">
                    <ul>
                        <li><a href="/instructor-dashboard"><i className="fas fa-home"></i> Home</a></li>
                        <li><a href="/instructor-students"><i className="fas fa-user"></i> Students</a></li>
                        <li><a href="/instructor-grades"><i className="fas fa-clipboard-list"></i> Grades</a></li>
                        <li><a href="/instructor-exams"><i className="fas fa-pen"></i> Exams</a></li>
                        <li><a href="/instructor-course-management"><i className="fas fa-book-open"></i> Course Management</a></li>
                        <li><a href="/messages"><i className="fas fa-envelope"></i> Messages</a></li>
                        <li><a href="/ai-tutor"><i className="fas fa-envelope"></i> AI-Tutor</a></li>                        <li><a href="/homepage"><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                    </ul>
                </div>

                <main id="main-content">
                    <div id="student-info">

                        <p>Name: {userData.name}</p>
                        <p>College: {userData.college}</p>
                        <p>Department: {userData.department}</p>
                        <p>Email: {userData.email}</p>
                        <a href="update-profile">
                            <button type="button">Update Profile</button>
                        </a>
                    </div>
                </main>
            </div>
        </>
    );
};

export default InstructorDashboard;
