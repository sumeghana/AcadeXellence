import React, { useState } from 'react';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersCog, faBook, faChartBar, faCogs, faSignOutAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

const UpdateProfile = () => {

    const [formData, setFormData] = useState({
    });
    const [role, setRole] = useState("");

    const goBack = () => {
        window.history.back();
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    useEffect(() => {
        // Fetching user id from local storage
        const userId = localStorage.getItem("userId");

        // Define the API request options
        const requestOptions = {
            method: "POST", // You can change this to "GET" if necessary
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ action: "view" }), // Set the action in the body
        };
        // Replace the URL with the actual API URL
        fetch(`https://sxs3330.uta.cloud/wdm/Users.php?id=${userId}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.user) {
                    setRole(data.user.role);
                    setFormData({
                        name: data.user.name,
                        college: data.user.college,
                        department: data.user.department,
                        email: data.user.email,
                        currentCourses: data.user.currentCourses,
                    });
                }
            })
            .catch((error) => {
                console.log("Error fetching data", error);
            });
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("userId");
        fetch(`https://sxs3330.uta.cloud/wdm/Users.php?id=${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'edit',
                email: formData.email,
                username: formData.name,
                role: role
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Form Data Submitted and updated: ", data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <nav id="top-navbar">
                <h1>Profile Dashboard</h1>
            </nav>

            <div id="wrapper">
                <main id="main-content">
                    <button className="back-button" onClick={goBack}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </button>
                    <div className="update-profile">

                        <h1>Update Profile</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="college">College:</label>
                                <input type="text" id="college" name="college" value={formData.college} onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="department">Department:</label>
                                <input type="text" id="department" name="department" value={formData.department} onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="currentCourses">Current Courses:</label>
                                <input type="text" id="currentCourses" name="currentCourses" value={formData.currentCourses} onChange={handleInputChange} />
                            </div>

                            <button type="submit">Save Changes</button>
                        </form>
                    </div>
                </main>
            </div>

        </div>
    );

};



export default UpdateProfile;
