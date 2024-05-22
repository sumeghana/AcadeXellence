import React, { useEffect, useState } from 'react';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardTeacher, faUserGraduate, faClipboardList, faSignOutAlt, faFileAlt, faEnvelope, faBook } from '@fortawesome/free-solid-svg-icons';
const ProgramCoordinatorCourseManagement = () => {

    useEffect(() => {
        getCourses();
    }, []);

    const [courses, setCourses] = useState([]); // State to store the courses


    const deleteCourse = async (courseId) => {
        const payload = {
            action: "delete",
            course_id: courseId,
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        };

        try {
            const response = await fetch('https://sxs3330.uta.cloud/wdm/courses.php', requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                if (data.status === "success") {

                    console.log('Course deleted successfully:', data);
                    getCourses();
                } else {
                    throw new Error('Failed to delete course: ' + data.message);
                }
            }
        } catch (error) {
            console.error('Error during course deletion:', error.message);
        }
    };



    const getCourses = async () => {
        const payload = {
            action: "read"
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        };

        try {
            const response = await fetch('https://sxs3330.uta.cloud/wdm/courses.php', requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                const data = await response.json();
                if (data.status === "success") {
                    setCourses(data.data); // Update the state with the fetched courses
                } else {
                    throw new Error('Failed to fetch courses: ' + data.message);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    // Call getCourses once the component mounts
    useEffect(() => {
        getCourses();
    }, []);

    return (
        <div>
            <head>

                <body>
                    <nav id="top-navbar">
                        <h1>Instructor Dashboard</h1>
                    </nav>
                </body>
            </head>
            <div id="wrapper">

                <div id="sidebar">
                    <ul>
                        <li><a href="pc-home"><i className="fas fa-home"></i> Profile</a></li>
                        <li><a href="programcoordinator-dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</a></li>
                        <li><a href="pc-course-management"><i className="fas fa-book"></i> Course Management</a></li>
                        <li><a href="pc-program-management"><i className="fas fa-book"></i> Program Management</a></li>
                        <li><a href="messages"><i className="fas fa-clipboard-check"></i> Messages</a></li>
                        <li><a href="homepage"><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                    </ul>
                </div>
                <main id="main-content">
                    <h1>Course Management</h1>
                    <a href="/add-course">
                        <button id="addCourseBtn">Add New Course</button>
                    </a>
                    <table id="courseTable">
                        <thead>
                            <tr>
                                <th>Course ID</th>
                                <th>Course Name</th>
                                <th>Course Description</th>
                                <th>Enrolled Students</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map(course => (
                                <tr key={course.id}>
                                    <td>{course.course_id}</td>
                                    <td>{course.course_name}</td>
                                    <td>{course.course_description}</td>

                                    <td>{course.instructor_id}</td>
                                    <td>
                                        <button onClick={() => deleteCourse(course.course_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    );
};

export default ProgramCoordinatorCourseManagement;
