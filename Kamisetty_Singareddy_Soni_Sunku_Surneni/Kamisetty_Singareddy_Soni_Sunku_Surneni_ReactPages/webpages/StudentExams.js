import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './main.css';

const StudentExams = () => {
    const [fetchedExams, setFetchedExams] = useState([]);
    const [selectedExamId, setSelectedExamId] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.post('https://sxs3330.uta.cloud/wdm/Exams.php', { action: 'getExamsForStudent', userId: userId })
            .then(response => {
                setFetchedExams(response.data.exams);
                console.log('Received exams:', response.data.exams);
            })
            .catch(error => {
                console.error('There was an error fetching the exams:', error);
            });
    }, [userId]);

    const handleExamClick = (examId) => {
        setSelectedExamId(examId);
    };

    return (
        <div>
            <nav id="top-navbar">
                <h1>Exams</h1>
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

                {/* Main Content */}
                <main id="main-content">
                    <h2 className="page-heading">Upcoming Exams</h2>

                    {Array.isArray(fetchedExams) && fetchedExams.map((exam, index) => (
                        <div key={index} className="exam-card" onClick={() => setSelectedExamId(selectedExamId === exam.exam_id ? null : exam.exam_id)}>
                            <div className="exam-header">
                                <i className={'fas fa-book-open exam-icon'}></i>
                                <h3>{exam.exam_title}</h3>
                            </div>
                            <div className="exam-body">
                                <p><strong>Exam Date:</strong> {exam.deadline}</p>
                                <p><strong>Duration:</strong> {exam.duration} minutes</p>
                                <p><strong>Total Marks:</strong> {exam.total_marks}</p>
                                <p><strong>Course ID:</strong> {exam.course_id}</p>
                            </div>
                            {selectedExamId === exam.exam_id && exam.questions && (
                                <div className="exam-questions">
                                    <h4>Questions:</h4>
                                    <p>{exam.questions}</p>
                                </div>

                            )}
                            <button className="take-exam-btn" onClick={() => {/* Implement logic to navigate to exam taking interface */ }}>
                                Take Exam
                            </button>
                        </div>
                    ))}
                </main>

            </div>
        </div>
    );
};

export default StudentExams;