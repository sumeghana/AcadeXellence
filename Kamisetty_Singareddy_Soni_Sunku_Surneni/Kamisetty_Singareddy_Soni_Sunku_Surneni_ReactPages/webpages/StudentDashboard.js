import React, { useState, useEffect } from 'react';
import './main.css';
import axios from 'axios';

const AcademicProgram = ({ program }) => {
    return (
        <div className="program">
            <h3>{program.program_name}</h3>
            <p>Department: {program.department_name}</p>
            <p>Instructor ID: {program.instructor_id}</p>
            <p>{program.program_description}</p>
            <p>Degree Type: {program.degree_type}</p>
            <p>Credit Hours Required: {program.credit_hours_required}</p>
            <p>Duration: {program.duration_years} years</p>
            <p>Start Date: {program.program_start_date}</p>
            <p>End Date: {program.program_end_date}</p>
        </div>
    );
};

const StudentDashboard = () => {
    const [userData, setUserData] = useState({});
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.post(`https://sxs3330.uta.cloud/wdm/Users.php?id=${userId}`, { action: 'view' });

                if (response.data && response.data.user) {
                    setUserData(response.data.user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchProgramsData = async () => {
            try {
                // Retrieve the userId from localStorage
                const userId = localStorage.getItem('userId');
                if (userId) {
                    const response = await axios.get(`https://sxs3330.uta.cloud/wdm/academic_program.php`, {
                        params: {
                            action: 'read',
                            user_id: userId // 
                        }
                    });
                    if (response.data && response.data.program) {
                        setPrograms([response.data.program]);
                    }
                }
            } catch (error) {
                console.error('Error fetching programs data:', error);
            }
        };

        fetchUserData();
        fetchProgramsData();
    }, []);

    return (
        <div>
            <nav id="top-navbar">
                <h1>Student Dashboard</h1>
            </nav>

            <div id="wrapper">
                <div id="sidebar">
                    <ul>
                        <li><a href="/student-dashboard"><i className="fas fa-home"></i> Home</a></li>
                        <li><a href="/course-catalog"><i className="fas fa-book"></i> Courses Catalog</a></li>
                        <li><a href="/student-subjects"><i className="fas fa-book"></i> Enrolled Courses</a></li>                        <li><a href="/student-grades"><i className="fas fa-star"></i> Grades</a></li>
                        <li><a href="/student-exams"><i className="fas fa-file-alt"></i> Exams & Assessments</a></li>
                        <li><a href="/messages"><i className="fas fa-envelope"></i> Messages</a></li>
                        <li><a href="/ai-tutor"><i className="fas fa-envelope"></i> AI-Tutor</a></li>

                        <li><a href="/homepage"><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                    </ul>
                </div>

                <main id="main-content">
                    <div id="student-info">
                        <p>Name: {userData.name}</p>
                        <p>Student ID: {userData.id}</p>
                        <p>Email: {userData.email}</p>
                        <p>College: {userData.college}</p>
                        <p>Semester: {userData.semester}</p>

                        <p>Program: {userData.program}</p>
                        <a href="update-profile">
                            <button type="button">Update Profile</button>
                        </a>
                    </div>
                    <div id="academic-programs">
                        <h2>Academic Program Overview</h2>
                        <div className="programs-list">
                            {programs.map((program, index) => (
                                <AcademicProgram key={index} program={program} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>

    );
};

export default StudentDashboard;
