import React from 'react';
import './main.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CourseCatalog = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('https://sxs3330.uta.cloud/wdm/courses.php', {
                    action: 'read',
                });

                if (response.data && response.data.data) {
                    setCourses(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEnroll = async (courseId) => {
        // Retrieve userId from local storage
        const userId = localStorage.getItem('userId'); // Make sure 'userId' is the correct key you've used to store the user ID

        // Check if the userId is not null
        if (!userId) {
            alert('Please log in to enroll in a course.');
            return;
        }

        try {
            const enrollResponse = await axios.post('https://sxs3330.uta.cloud/wdm/courses.php', {
                action: 'enroll_student',
                user_id: userId,
                course_id: courseId
            });

            // Check the response from the server
            if (enrollResponse.data && enrollResponse.data.status === 'success') {
                alert(`Successfully enrolled in course: ${courseId}`);
            } else {
                alert('Failed to enroll in the course. Please try again later.');
            }
        } catch (error) {
            console.error('Error enrolling in course:', error);
            alert('There was an error enrolling in the course.');
        }
    };

    return (
        <div>
            <nav id="top-navbar">
                <h1>Available Courses</h1>
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
                        ) : (
                            courses.map((course, index) => (
                                <div key={index} className="course-card">
                                    <h2>{course.course_id}</h2>
                                    <h2>{course.course_name}</h2>
                                    <p>{course.course_description}</p>
                                    {/* Mock "Enroll" button */}
                                    <button
                                        onClick={() => handleEnroll(course.course_id)}
                                        className="enroll-button"
                                    >
                                        Enroll
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CourseCatalog;
