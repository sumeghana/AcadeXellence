import React, { useState, useEffect } from 'react';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersCog, faBook, faChartBar, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const AdminDashboard = () => {
    const [totals, setTotals] = useState({ totalUsers: 0, totalCourses: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://sxs3330.uta.cloud/wdm/Users.php', {
                    action: 'get_counts'
                });

                if (response.data) {
                    setTotals({
                        totalUsers: response.data.total_users,
                        totalCourses: response.data.total_courses
                    });
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
                // Handle error accordingly
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <nav id="top-navbar">
                <h1>Admin Dashboard</h1>
            </nav>

            <div id="wrapper">
                <div id="sidebar">
                    <ul>
                        <li><a href="admin-dashboard"><FontAwesomeIcon icon={faUsersCog} /> Admin Dashboard</a></li>
                        <li><a href="admin-user-management"><FontAwesomeIcon icon={faUsersCog} /> User Management</a></li>
                        <li><a href="admin-course-management"><FontAwesomeIcon icon={faBook} /> Course Management</a></li>
                        <li><a href="admin-analytics"><FontAwesomeIcon icon={faChartBar} /> Analytics</a></li>
                        <li><a href="messages"><FontAwesomeIcon icon={faCogs} /> Messages</a></li>
                        <li><a href="homepage"><FontAwesomeIcon icon={faSignOutAlt} /> Log out</a></li>
                    </ul>
                </div>

                <main id="main-content">
                    <h1>Summary</h1>
                    <div className="card">
                        <h2>Total Users</h2>
                        <p>{totals.totalUsers}</p>
                    </div>
                    <div className="card">
                        <h2>Total Courses</h2>
                        <p>{totals.totalCourses}</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
