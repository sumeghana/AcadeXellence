import React from 'react';
import './main.css'; // Assuming you'll use the same stylesheet

const QAAudit = () => {
    return (
        <>
            <nav id="top-navbar">
                <h1>Quality Manager Dashboard</h1>
            </nav>
            <div id="wrapper">
                {/* Side Navigation */}
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
                {/* Main Content */}
                <main id="main-content">
                    <h1>Audits & Evaluations</h1>
                    <table>
                        <tr>
                            <th>Audit ID</th>
                            <th>Course Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Conducted On</th>
                        </tr>
                        <tr>
                            <td>AE101</td>
                            <td>Algorithms</td>
                            <td>Content</td>
                            <td>Complete</td>
                            <td>01/01/2023</td>
                        </tr>
                        {/* Add more rows here */}
                    </table>
                    <form>
                        <label htmlFor="auditID">Audit ID:</label>
                        <input type="text" id="auditID" name="auditID" readOnly />

                        <label htmlFor="auditDate">Date:</label>
                        <input type="text" id="auditDate" name="auditDate" readOnly />

                        <label htmlFor="courseName">Course Name:</label>
                        <input type="text" id="courseName" name="courseName" readOnly />

                        <label htmlFor="auditDetails">Audit Details:</label>
                        <textarea id="auditDetails" name="auditDetails" readOnly></textarea>

                        <input type="submit" value="Conduct Audit" />
                    </form>
                </main>
            </div>
        </>
    );
};

export default QAAudit;
