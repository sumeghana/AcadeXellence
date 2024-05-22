import React from 'react';
import './main.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const StudentSubjects = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const user_id = localStorage.getItem('userId');

            try {
                const response = await axios.post('https://sxs3330.uta.cloud/wdm/courses.php', {
                    action: 'get_enrolled_courses',
                    user_id: user_id
                });

                if (response.data && response.data.enrolled_courses) {
                    setCourses(response.data.enrolled_courses); // This line was changed
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <nav id="top-navbar">
                <h1>Enrolled Courses</h1>
            </nav>

            <div id="wrapper">
                {/* Side Navigation */}
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
                    <div id="courses">
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : courses.length > 0 ? (
                            courses.map((course, index) => (
                                <div key={index} className="course-card"> {/* key prop added */}
                                    <h2>{course.course_id}</h2>
                                    <h2>{course.course_name}</h2>
                                    <p>{course.course_description}</p>
                                </div>
                            ))
                        ) : (
                            <div>No courses enrolled.</div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentSubjects;
