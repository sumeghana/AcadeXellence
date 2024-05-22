import React from 'react';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faStar, faFileAlt, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
const StudentGrades = () => {
    const [grades, setGrades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://sxs3330.uta.cloud/wdm/Grades.php', {
                    action: 'read',
                });

                if (response.data && response.data.grades) {
                    const userId = localStorage.getItem('userId');
                    const filteredGrades = response.data.grades.filter((grade) => grade.student_id === userId);
                    setGrades(filteredGrades);
                }
            } catch (error) {
                console.error('Error fetching grades:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

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
                    <div id="grade-header">
                        <h1>CGPA: 3.8</h1>
                    </div>

                    <h2>Grades</h2>

                    <table id="grade-table">
                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades.map((grade, index) => (
                                <tr key={index}>
                                    <td>{grade.course_id}</td>
                                    <td>{grade.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
};
export default StudentGrades;
