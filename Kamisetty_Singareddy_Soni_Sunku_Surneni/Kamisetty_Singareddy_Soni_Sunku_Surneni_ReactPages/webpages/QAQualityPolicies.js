import React from 'react';
import './main.css';  // make sure this CSS file exists in your project

const QAQualityPolicies = () => {
    return (
        <div>
            <nav id="top-navbar">
                <h1>Quality Manager Dashboard</h1>
            </nav>
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
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="3">Quality Process and Policies</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="3">
                                    <button>Create New Policy</button>
                                </td>
                            </tr>
                            <tr>
                                <th>ID</th>
                                <th>Quality Procedure</th>
                                <th>Action</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>Instructor Training</td>
                                <td><a href="#">Edit</a> | <a href="#">Delete</a></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Student Support Services</td>
                                <td><a href="#">Edit</a> | <a href="#">Delete</a></td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
};

export default QAQualityPolicies;
