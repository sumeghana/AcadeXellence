import React, { useState } from 'react';
import './main.css'; // Adjust the path according to your project structure

const QACourseReview = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const openPopup = () => {
        setModalOpen(true);
    };

    const closePopup = () => {
        setModalOpen(false);
    };

    return (
        <>
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
                    <h1>Course Review</h1>
                    <button id="popup" onClick={openPopup}>
                        Add Review
                    </button>
                    <h2>List of Program Reviews</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Last Reviewed</th>
                                <th>Review Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>101</td>
                                <td>Course-Algorithms</td>
                                <td>01/01/2023</td>
                                <td>Complete</td>
                            </tr>
                            <tr>
                                <td>234</td>
                                <td>Instructor</td>
                                <td>04/01/2023</td>
                                <td>Incomplete</td>
                            </tr>
                        </tbody>
                    </table>
                    {modalOpen && (
                        <div id="myModal" className="modal">
                            <div className="modal-content">
                                <h2>Add New Review</h2>
                                <form>
                                    <label htmlFor="reviewTitle">Review Title:</label>
                                    <input type="text" id="reviewTitle" name="reviewTitle" required /><br /><br />

                                    <label htmlFor="reviewDate">Review Date:</label>
                                    <input type="date" id="reviewDate" name="reviewDate" required /><br /><br />

                                    <label htmlFor="reviewDetails">Review Details:</label>
                                    <textarea id="reviewDetails" name="reviewDetails" rows="4" required></textarea><br /><br />

                                    <input type="submit" value="Add Review" />
                                </form>
                                <button onClick={closePopup}>Close</button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default QACourseReview;
