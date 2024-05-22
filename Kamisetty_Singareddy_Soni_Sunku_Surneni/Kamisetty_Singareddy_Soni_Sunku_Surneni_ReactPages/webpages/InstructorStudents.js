import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css';

const InstructorStudents = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Replace with your API URL
        const apiUrl = 'https://sxs3330.uta.cloud/wdm/Users.php';

        axios.post(apiUrl, {
            action: 'list_students'
        })
            .then(response => {
                setStudents(response.data.students);
            })
            .catch(error => {
                console.error("Something went wrong!", error);
            });
    }, []);

    return (
        <>
            <nav id="top-navbar">
                <h1>Instructor Dashboard</h1>
            </nav>

            <div id="wrapper">
                <div id="sidebar">
                    <ul>
                        <li><a href="/instructor-dashboard"><i className="fas fa-home"></i> Home</a></li>
                        <li><a href="/instructor-students"><i className="fas fa-user"></i> Students</a></li>
                        <li><a href="/instructor-grades"><i className="fas fa-clipboard-list"></i> Grades</a></li>
                        <li><a href="/instructor-exams"><i className="fas fa-pen"></i> Exams</a></li>
                        <li><a href="/instructor-course-management"><i className="fas fa-book-open"></i> Course Management</a></li>
                        <li><a href="/messages"><i className="fas fa-envelope"></i> Messages</a></li>
                        <li><a href="/ai-tutor"><i className="fas fa-envelope"></i> AI-Tutor</a></li>                        <li><a href="/homepage"><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                    </ul>
                </div>

                <main id="main-content">
                    <h2>Enrolled Students</h2>

                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Student #</th>
                                <th>Full Name</th>
                                <th>Program</th>
                                <th>Email Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.program}</td>
                                    <td>{student.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </>
    );
};

export default InstructorStudents;
