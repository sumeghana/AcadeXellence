import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';

const InstructorDashboard = () => {
    const [grades, setGrades] = useState([]);
    const instructorIdFromLocalStorage = localStorage.getItem('userId'); // replace with actual key
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch grades
        const fetchGrades = axios.post('https://sxs3330.uta.cloud/wdm/Grades.php', { action: 'read' });

        // Fetch students
        const fetchStudents = axios.post('https://sxs3330.uta.cloud/wdm/Users.php', { action: 'list_students' });

        Promise.all([fetchGrades, fetchStudents])
            .then(responses => {
                const [gradesData, studentsData] = responses;
                setGrades(gradesData.data.grades);
                setStudents(studentsData.data.students);
            })
            .catch(errors => {
                console.error('There were some errors:', errors);
            });
    }, []);
    const instructorIdAsString = String(instructorIdFromLocalStorage);
    console.log('Instructor ID from local storage:', instructorIdAsString);

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
                    <h5>Course Code - CSE5301</h5>
                    <h5>Subject - Web Development</h5>
                    <h1>List of Students</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Student #</th>
                                <th>Full Name</th>
                                <th>Email Address</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {grades
                                .filter(grade => grade.instructor_id === instructorIdAsString)
                                .map((grade, index) => {
                                    // Find student data based on student_id
                                    const student = students.find(stu => stu.id === grade.student_id) || {};
                                    return (
                                        <tr key={grade.grade_id}>
                                            <td>{index + 1}</td>
                                            <td>{grade.student_id}</td>
                                            <td>{student.name || "Unknown"}</td>
                                            <td>{student.email || "Unknown"}</td>
                                            <td>{grade.grade || "Unknown"}</td>



                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </main>
            </div>
        </>
    );
};

export default InstructorDashboard;
