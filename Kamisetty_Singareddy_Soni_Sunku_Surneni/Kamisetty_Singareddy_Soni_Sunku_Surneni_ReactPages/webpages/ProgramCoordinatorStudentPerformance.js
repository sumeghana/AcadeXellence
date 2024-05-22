import React from 'react';

function PCInstPerformance() {
    return (
        <div>
            <nav id="top-navbar">
                <h1>Program Coordinator Dashboard</h1>
            </nav>

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

                {/* Main Content */}
                <main id="main-content">
                    <h1>Student Performance</h1>

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
                                <td>001</td>
                                <td>abc</td>
                                <td>abc@example.com</td>
                                <td>Student</td>
                                <td>Active</td>
                                <td>
                                    <button type="button" onClick={() => window.location.href = 'Pcperformancegraphs.html'}>View Performance</button>
                                    <button>Provide Feedback</button>
                                    <button>Current Courses</button>
                                </td>
                            </tr>
                            {/* More rows here */}
                        </tbody>
                    </table>
                </main>

            </div>
        </div>
    );
}

export default PCInstPerformance;