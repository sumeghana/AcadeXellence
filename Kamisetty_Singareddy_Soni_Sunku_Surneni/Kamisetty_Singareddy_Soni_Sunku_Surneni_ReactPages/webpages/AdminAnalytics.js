import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

const AdminAnalytics = () => {
    const [courseEnrollmentData, setCourseEnrollmentData] = useState({
        labels: [],
        datasets: []
    });
    const [gradeDistributionData, setGradeDistributionData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://sxs3330.uta.cloud/wdm/reports.php?action=get_pie_charts_data');
                const data = response.data;

                // Process course enrollment data
                const courseNames = data.course_enrollment.map(item => item.course_name);
                const studentCounts = data.course_enrollment.map(item => item.student_count);
                setCourseEnrollmentData({
                    labels: courseNames,
                    datasets: [{
                        data: studentCounts,
                        backgroundColor: ['red', 'blue', 'green'], // Add more colors as needed
                        hoverBackgroundColor: ['darkred', 'darkblue', 'darkgreen'] // Add more colors as needed
                    }]
                });

                // Process grade distribution data
                const grades = data.grade_distribution.map(item => item.grade);
                const gradeCounts = data.grade_distribution.map(item => item.grade_count);
                setGradeDistributionData({
                    labels: grades,
                    datasets: [{
                        data: gradeCounts,
                        backgroundColor: ['yellow', 'purple', 'orange'], // Add more colors as needed
                        hoverBackgroundColor: ['darkyellow', 'darkpurple', 'darkorange'] // Add more colors as needed
                    }]
                });

            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <nav id="top-navbar">
                <h1>Admin Dashboard</h1>
            </nav>

            <div id="sidebar">
                <ul>
                    <li><a href="admin-dashboard"> Admin Dashboard</a></li>
                    <li><a href="admin-user-management"> User Management</a></li>
                    <li><a href="admin-course-management"> Course Management</a></li>
                    <li><a href="admin-analytics"> Analytics</a></li>
                    <li><a href="messages"> Messages</a></li>
                    <li><a href="homepage"> Log out</a></li>
                </ul>
            </div>

            <main id="main-content">
                <h1>Admin Analytics</h1>
                <div className="analytics-container">
                    <div className="chart-container">
                        <h3>User Engagement</h3>
                        <Pie data={courseEnrollmentData} />
                    </div>
                    <div className="chart-container">
                        <h3>Course Performance</h3>
                        <Pie data={gradeDistributionData} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminAnalytics;