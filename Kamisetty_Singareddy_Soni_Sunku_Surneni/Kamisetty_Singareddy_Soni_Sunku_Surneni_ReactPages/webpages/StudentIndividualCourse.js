import React, { useState } from 'react';
import './main.css';  // make sure you have a file named main.css for the styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faStar, faFileAlt, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const StudentIndividualCourse = () => {
    return (
        <div>
            <nav id="top-navbar">
                <h1>Grades</h1>
            </nav>

            <div id="wrapper">
                <div id="sidebar">
                    <ul>
                        <li><a href="/student-dashboard"><i className="fas fa-home"></i> Home</a></li>
                        <li><a href="/course-catalog"><i className="fas fa-book"></i> Courses Catalog</a></li>
                        <li><a href="/student-subjects"><i className="fas fa-book"></i> Enrolled Courses</a></li>                        <li><a href="/student-grades"><i className="fas fa-star"></i> Grades</a></li>
                        <li><a href="/student-exams"><i className="fas fa-file-alt"></i> Exams & Assessments</a></li>
                        <li><a href="/messages"><i className="fas fa-envelope"></i> Messages</a></li>
                        <li><a href="/ai-tutor"><i className="fas fa-envelope"></i> AI-Tutor</a></li>                        <li><a href="/homepage"><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                    </ul>
                </div>

                <main id="main-content">
                    <div id="course-header">
                        <img src="https://miro.medium.com/v2/resize:fit:1400/1*aTYOTFS4Vkr-nwHNML3GvQ.jpeg" alt="Web Development" />
                        <h1 style={{ padding: '15px' }}>CSE5305 - UI/UX Design - Fall 2023</h1>
                    </div>

                    <div id="course-actions">
                        <a href="course-syllabus">
                            <button><i className="fas fa-book"></i> Syllabus</button>
                        </a>
                        <button><i className="fas fa-file-alt"></i> Lecture Notes</button>
                        <button><i className="fas fa-pencil-alt"></i> Exams/Assignments</button>
                        <button><i className="fas fa-comments"></i> Discussion</button>
                    </div>

                    <div id="course-grade">
                        <h3>Grade: 87%</h3>
                        <p>Feedback</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentIndividualCourse;
