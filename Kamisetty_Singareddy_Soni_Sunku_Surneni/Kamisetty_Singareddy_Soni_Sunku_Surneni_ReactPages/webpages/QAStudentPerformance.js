import React from 'react';
import './main.css'; // Again, ensure the path is correct

const QAStudentPerformance = () => {
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
                <h1>Student Performance Metrics</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Full Name</th>
                            <th>Average Grade</th>
                            <th>Attendance</th>
                            <th>Projects Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>001</td>
                            <td>ABC</td>
                            <td>A</td>
                            <td>95%</td>
                            <td>3</td>
                        </tr>
                        {/* Feel free to add more rows here */}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default QAStudentPerformance;
