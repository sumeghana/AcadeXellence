import React from 'react';
import './main.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProgramCoordinatorHome = () => {

    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        fetch(`https://sxs3330.uta.cloud/wdm/Users.php?id=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ action: 'view' })
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data.user);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [userId]);

    const nextStep = (step) => {
        console.log('Next Step: ', step);
        // Implement your logic here
    };

    return (
        <>
            <nav id="top-navbar">
                <h1>Program Coordinator Dashboard</h1>
            </nav>

            <div id="wrapper">
                <div id="sidebar">
                    <ul>
                        <li><a href="pc-home"><i className="fas fa-home"></i> Profile</a></li>
                        <li><a href="programcoordinator-dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</a></li>
                        <li><a href="pc-course-management"><i className="fas fa-book"></i> Course Management</a></li>
                        <li><a href="pc-program-management"><i className="fas fa-book"></i> Program Management</a></li>
                        <li><a href="messages"><i className="fas fa-clipboard-check"></i> Messages</a></li>
                        <li><a href="homepage"><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                    </ul>
                </div>

                <main id="main-content">
                    <div id="student-info">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Professor_Steven_Chu_ForMemRS_headshot.jpg"
                            alt="Student Photo" />
                        <p>Name: {userData ? userData.name : 'Loading...'}</p>
                        <p>College: {userData ? userData.college : 'Loading...'}</p>
                        <p>Department: {userData ? userData.department : 'Loading...'}</p>
                        <p>Email: {userData ? userData.email : 'Loading...'}</p>
                        <button type="button" onClick={() => nextStep(1)}>Update Profile</button>
                    </div>
                </main>
            </div>
        </>
    );
};

export default ProgramCoordinatorHome;
