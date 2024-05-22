import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt, faBook, faChartLine, faClipboardCheck, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ProgramCoordinatorPerformance = () => {
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');

    const performanceData = {
        '001': [85, 92, 78, 89, 93],
        '002': [92, 88, 76, 90, 85],
    };

    const data = {
        labels: ['Exam 1', 'Exam 2', 'Exam 3', 'Exam 4', 'Exam 5'],
        datasets: [
            {
                label: 'Performance',
                data: performanceData[userId] || [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            },
        },
    };

    const sendMessage = () => {
        console.log(`Message: ${message}`);
    };

    return (
        <div>
            <style>{`
        /* Add your styles here */
      `}</style>
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
                <div className="container">
                    <h2>Performance Data</h2>
                    <label htmlFor="userId">Enter User ID:</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                    {/* <Line data={data} options={options} /> */}
                    <label htmlFor="message">Send a Message:</label>
                    <textarea
                        id="message"
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="button-container">
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramCoordinatorPerformance;
