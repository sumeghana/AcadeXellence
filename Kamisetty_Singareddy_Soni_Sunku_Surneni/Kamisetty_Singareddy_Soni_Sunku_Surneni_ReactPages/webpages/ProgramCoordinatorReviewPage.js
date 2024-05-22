import React from 'react';
import './main.css';  // Assuming you also convert your main.css to be used with React
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';

const ProgramCoordinatorReviewPage = () => {
    return (
        <div id="wrapper">
            {/* Side Navigation */}
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
                <h1>User Management</h1>
                <button id="addUserBtn" style={{ marginRight: '10px' }}>Add New User</button>
                <table id="userTable">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example Row */}
                        <tr>
                            <td>1</td>
                            <td>abc</td>
                            <td>abc@example.com</td>
                            <td>Student</td>
                            <td>Active</td>
                            <td>
                                <button style={{ marginRight: '10px' }}>View Performance</button>
                                <button style={{ marginLeft: '10px' }}>Provide Feedback</button>
                            </td>
                        </tr>
                        {/* More rows can be added here */}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default ProgramCoordinatorReviewPage;
