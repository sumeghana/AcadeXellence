import React from 'react';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsersCog, faStar, faBook, faFileAlt, faChartBar, faCogs, faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const CourseSyllabus = () => {
    return (
        <div>
            <nav id="top-navbar">
                <h1>COURSES</h1>
            </nav>

            <div id="wrapper">
                <div id="sidebar">
                    <ul>
                        <li><a href="#"><FontAwesomeIcon icon={faHome} /> Home</a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faBook} /> Enrolled Courses</a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faStar} /> Grades</a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faFileAlt} /> Exams</a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faEnvelope} /> Messages</a></li>
                        <li><a href="#"><FontAwesomeIcon icon={faSignOutAlt} /> Log out</a></li>
                    </ul>
                </div>

                <main id="main-content">
                    <section id="syllabus">
                        <h2>Syllabus</h2>
                        <div id="course-description">
                            <h3>Course Description</h3>
                            <p>This course aims to equip you with the necessary skills to create dazzling, user-centered interfaces.</p>
                        </div>

                        <div id="learning-objectives">
                            <h3>Learning Objectives</h3>
                            <ul>
                                <li>Master the art of user empathy</li>
                                <li>Design interfaces that are a treat for the eyes</li>
                            </ul>
                        </div>

                        <div id="weekly-topics">
                            <h3>Weekly Topics</h3>
                            <ol>
                                <li>Week 1: What is UX/UI?</li>
                                <li>Week 2: Color Theory and Why It Matters</li>
                            </ol>
                        </div>

                        <div id="textbooks">
                            <h3>Recommended Textbooks</h3>
                            <ul>
                                <li>"Don't Make Me Think" by Steve Krug</li>
                                <li>"The Design of Everyday Things" by Don Norman</li>
                            </ul>
                        </div>

                        <div id="grading-criteria">
                            <h3>Grading Criteria</h3>
                            <table>
                                <tr>
                                    <th>Assessment</th>
                                    <th>Weightage</th>
                                </tr>
                                <tr>
                                    <td>Assignments</td>
                                    <td>40%</td>
                                </tr>
                                <tr>
                                    <td>Final Project</td>
                                    <td>30%</td>
                                </tr>
                                <tr>
                                    <td>Participation</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <td>Quizzes</td>
                                    <td>10%</td>
                                </tr>
                            </table>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};


export default CourseSyllabus;
