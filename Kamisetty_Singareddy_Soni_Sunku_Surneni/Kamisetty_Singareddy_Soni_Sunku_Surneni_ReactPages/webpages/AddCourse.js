import React, { useState } from 'react';
import './main.css'; // Make sure this CSS file exists and is properly linked.
import { faUsersCog, faBook, faChartBar, faCogs, faSignOutAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddCourse = () => {
    const [courseData, setCourseData] = useState({
        course_id: '',
        course_name: '',
        course_description: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({
            ...courseData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userId');

        // Prepare the request data structure
        const requestData = {
            ...courseData,
            action: "create",
            instructor_id: parseInt(userId, 10) // Ensure it's an integer
        };

        setIsLoading(true);


        // Sending the POST request to the provided API endpoint
        fetch('https://sxs3330.uta.cloud/wdm/courses.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                // Handle any post-success actions here
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setError(error.toString());
                setIsLoading(false);
            });
    };
    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="add-course">
            <h1>Add New Course</h1>
            <button className="back-button" onClick={goBack}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
            </button>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="course_id">Course ID:</label>
                    <input type="text" id="course_id" name="course_id" value={courseData.course_id} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="course_name">Course Name:</label>
                    <input type="text" id="course_name" name="course_name" value={courseData.course_name} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="course_description">Course Description:</label>
                    <input type="text" id="course_description" name="course_description" value={courseData.course_description} onChange={handleInputChange} />
                </div>

                <button type="submit">Add Course</button>
            </form>
        </div>
    );
};

export default AddCourse;
