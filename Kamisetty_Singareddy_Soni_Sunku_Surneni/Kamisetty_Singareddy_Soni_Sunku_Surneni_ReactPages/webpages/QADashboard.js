import React, { useState, useEffect } from 'react';
import './main.css'; // Make sure the path is correct
import axios from 'axios';
const QADashboard = () => {

    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Trigger loading state
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    console.error("No user ID found in local storage.");
                    setIsLoading(false);
                    return;
                }

                const payload = { action: "view" };

                const response = await axios.post(`https://sxs3330.uta.cloud/wdm/Users.php?id=${userId}`, payload);

                if (response.data && response.data.user) {
                    setUserData(response.data.user); // Set only the user data
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
            setIsLoading(false); // Turn off loading state after the API call
        };

        fetchData();
    }, []);

    const renderUserData = () => {
        if (isLoading) {
            return <p>Loading...</p>;
        }

        if (!userData) {
            return <p>No user data available.</p>;
        }

        // Render the user data excluding the password fields
        return (
            <>
                <p>ID: {userData.id}</p>
                <p>Role: {userData.role}</p>
                <p>Username: {userData.username}</p>
                <p>Email: {userData.email}</p>
                {/* <p>Name: {userData.name}</p>
                <p>College: {userData.college}</p>
                <p>Department: {userData.department}</p> */}
            </>
        );
    };


    return (
        <div id="wrapper">

            <div id="sidebar">
                <ul>
                    <li><a href="qa-dashboard"><i className="fas fa-tachometer-alt"></i> QA Dashboard</a></li>
                    <li><a href="qa-course-review"><i className="fas fa-book"></i> Review</a></li>
                    <li><a href="qa-audit"><i className="fas fa-file-alt"></i> Audits & Evaluations</a></li>
                    <li><a href="qa-student-performance"><i className="fas fa-chart-line"></i> Student Performance</a></li>
                    <li><a href="qa-qality-policies"><i className="fas fa-cogs"></i> Process and Policies </a></li>
                    <li><a href="messages"><i className="fas fa-cogs"></i> Messages </a></li>
                    <li><a href="homepage"><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                </ul>
            </div>

            <main id="main-content">

                {renderUserData()}

                <h1>QA Officer Dashboard</h1>
                <div className="card">
                    <h2>Pending Courses for Review</h2>
                    <p>12</p>
                </div>
                <div className="card">
                    <h2>Recent Audits</h2>
                    <p>3 this month</p>
                </div>
                <div className="card">
                    <h2>Student Performance</h2>
                    <p>Average: 75%</p>
                </div>
                <div className="card">
                    <h2>Compliance Checklist</h2>
                    <p>8/10 Completed</p>
                </div>
            </main>
        </div>
    );
};

export default QADashboard;
