import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTachometerAlt, faBook, faChartLine, faClipboardCheck, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const PCProgramManagement = () => {
    return (
        <div>

            <nav id="top-navbar">
                <h1>Program Coordinator Dashboard</h1>
            </nav>
            <div id="wrapper">
                <div id="sidebar">
                    <ul>
                        <li><a href="pc-home"><i className="fas fa-home"></i> Dashboard</a></li>
                        <li><a href="programcoordinator-dashboard"><i className="fas fa-tachometer-alt"></i> Profile</a></li>
                        <li><a href="pc-course-management"><i className="fas fa-book"></i> Course Management</a></li>
                        <li><a href="pc-program-management"><i className="fas fa-book"></i> Program Management</a></li>
                        <li><a href="messages"><i className="fas fa-clipboard-check"></i> Messages</a></li>
                        <li><a href="homepage"><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                    </ul>
                </div>
                <main id="main-content">
                    <h1>Program Management</h1>
                    <button id="addCourseBtn">Add New Program</button>
                    <table id="courseTable">
                        <thead>
                            <tr>
                                <th>Program ID</th>
                                <th>Program Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>101</td>
                                <td>Computer Science</td>
                                <td>
                                    <button style={{ padding: '10px 20px', marginRight: '10px' }}>Edit</button>
                                    <button style={{ padding: '10px 20px' }}>Delete</button>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
};

export default PCProgramManagement;
