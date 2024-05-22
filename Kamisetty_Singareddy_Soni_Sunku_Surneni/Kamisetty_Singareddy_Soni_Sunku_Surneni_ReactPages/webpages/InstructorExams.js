// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './main.css';

// const InstructorExams = () => {
//     const [fetchedExams, setFetchedExams] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [form, setForm] = useState({
//         examTitle: '',
//         examDate: '',
//         totalMarks: '',
//         duration: '',
//         courseId: ''
//     });
//     const [isLoading, setIsLoading] = useState(false); // State for loading indicator
//     const [topic, setTopic] = useState(''); // State for topic
//     const [questions, setQuestions] = useState([]); // State for fetched questions
//     const [selectedQuestions, setSelectedQuestions] = useState([]); // State for selected questions

//     useEffect(() => {
//         axios.post('https://sxs3330.uta.cloud/wdm/Exams.php', { action: 'read' })
//             .then(response => {
//                 setFetchedExams(response.data.exams);
//             })
//             .catch(error => {
//                 console.error('Error fetching the exams:', error);
//             });

//         axios.post('https://sxs3330.uta.cloud/wdm/courses.php', { action: 'read' })
//             .then(response => {
//                 if (response.data.status === 'success') {
//                     setCourses(response.data.data);
//                     setForm(prevForm => ({
//                         ...prevForm,
//                         courseId: response.data.data[0].course_id
//                     }));
//                 } else {
//                     console.error('Error fetching courses:', response.data);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching courses:', error);
//             });
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm(prevForm => ({
//             ...prevForm,
//             [name]: value
//         }));
//     };

//     const handleTopicChange = (e) => {
//         setTopic(e.target.value);
//     };

//     const userId = localStorage.getItem('userId');

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         const formData = {
//             action: 'create',
//             exam_title: form.examTitle,
//             deadline: form.examDate,
//             total_marks: form.totalMarks,
//             duration: form.duration,
//             course_id: form.courseId,
//             instructor_id: userId,
//             questions: selectedQuestions.join(', ')
//         };

//         axios.post('https://sxs3330.uta.cloud/wdm/Exams.php', formData)
//             .then(response => {
//                 if (response.data && response.data.result === 'Exam created') {
//                     alert("Exam created successfully!");
//                     setFetchedExams([...fetchedExams, response.data]);
//                 } else {
//                     alert("Failed to create exam.");
//                 }
//             })
//             .catch(error => {
//                 console.error('Error creating new exam:', error);
//                 alert("An error occurred while creating the exam.");
//             });
//     };

//     const fetchQuestions = () => {
//         setIsLoading(true);
//         axios.post('https://sxs3330.uta.cloud/wdm/instructor-ai.php', { topic })
//             .then(response => {
//                 if (response.data && response.data.response) {
//                     const aiQuestions = response.data.response.choices[0].message.content.split('\n');

//                     // Create the formData object
//                     const formData = {
//                         action: 'create',
//                         exam_title: form.examTitle,
//                         deadline: form.examDate,
//                         total_marks: form.totalMarks,
//                         duration: form.duration,
//                         course_id: form.courseId,
//                         instructor_id: userId,
//                         questions: selectedQuestions.join(', '),
//                         aiQuestions: aiQuestions.join(', ') // Include AI-generated questions
//                     };

//                     axios.post('https://sxs3330.uta.cloud/wdm/Exams.php', formData)
//                         .then(response => {
//                             if (response.data && response.data.result === 'Exam created') {
//                                 alert("Exam created successfully!");
//                                 setFetchedExams([...fetchedExams, response.data]);
//                             } else {
//                                 alert("Failed to create exam.");
//                             }
//                         })
//                         .catch(error => {
//                             console.error('Error creating new exam:', error);
//                             alert("An error occurred while creating the exam.");
//                         });
//                 }
//             })
//             .catch(error => console.error('Error fetching AI-generated questions:', error));
//     };

//     const handleQuestionCheck = (question) => {
//         setSelectedQuestions(prevSelected => {
//             if (prevSelected.includes(question)) {
//                 return prevSelected.filter(q => q !== question);
//             } else {
//                 return [...prevSelected, question];
//             }
//         });
//     };

//     return (
//         <>
//             <nav id="top-navbar">
//                 <h1>Exams - Instructor Dashboard</h1>
//             </nav>

//             <div id="wrapper">
//                 <div id="sidebar">
//                     <ul>
//                         <li><a href="/instructor-dashboard"><i className="fas fa-home"></i> Home</a></li>
//                         <li><a href="/instructor-students"><i className="fas fa-user"></i> Students</a></li>
//                         <li><a href="/instructor-grades"><i className="fas fa-clipboard-list"></i> Grades</a></li>
//                         <li><a href="/instructor-exams"><i className="fas fa-pen"></i> Exams</a></li>
//                         <li><a href="/instructor-course-management"><i className="fas fa-book-open"></i> Course Management</a></li>
//                         <li><a href="/messages"><i className="fas fa-envelope"></i> Messages</a></li>
//                         <li><a href="/ai-tutor"><i className="fas fa-envelope"></i> AI-Tutor</a></li>
//                         <li><a href="/homepage"><i className="fas fa-sign-out-alt"></i> Log out</a></li>
//                     </ul>
//                 </div>

//                 <main id="main-content">
//                     <section id="exam-details">
//                         <h2>Upcoming Exams</h2>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Exam Title</th>
//                                     <th>Deadline</th>
//                                     <th>Total Marks</th>
//                                     <th>Duration (min)</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {fetchedExams.map((exam, index) => (
//                                     <tr key={index}>
//                                         <td>{exam.exam_title}</td>
//                                         <td>{exam.deadline}</td>
//                                         <td>{exam.total_marks}</td>
//                                         <td>{exam.duration}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </section>
//                     <section id="post-exam-section">
//                         <h2>Post New Exam</h2>
//                         <h4>Select Course:</h4>
//                         <select
//                             id="course-dropdown"
//                             name="courseId"
//                             value={form.courseId}
//                             onChange={handleChange}
//                             required
//                         >
//                             {courses.map((course) => (
//                                 <option key={course.id} value={course.course_id}>
//                                     {course.course_name}
//                                 </option>
//                             ))}
//                         </select>

//                         <form id="post-exam-form" onSubmit={handleFormSubmit}>
//                             <label htmlFor="exam-title">Exam Title:</label>
//                             <input
//                                 type="text"
//                                 id="exam-title"
//                                 name="examTitle"
//                                 value={form.examTitle}
//                                 onChange={handleChange}
//                                 required
//                             />

//                             <label htmlFor="exam-date">Date:</label>
//                             <input
//                                 type="date"
//                                 id="exam-date"
//                                 name="examDate"
//                                 value={form.examDate}
//                                 onChange={handleChange}
//                                 required
//                             />

//                             <label htmlFor="total-marks">Total Marks:</label>
//                             <input
//                                 type="number"
//                                 id="total-marks"
//                                 name="totalMarks"
//                                 value={form.totalMarks}
//                                 onChange={handleChange}
//                                 required
//                             />

//                             <label htmlFor="duration">Duration (min):</label>
//                             <input
//                                 type="number"
//                                 id="duration"
//                                 name="duration"
//                                 value={form.duration}
//                                 onChange={handleChange}
//                                 required
//                             />
//                             <h2>Fetch Exam Questions</h2>
//                             <input type="text" value={topic} onChange={handleTopicChange} placeholder="Enter Topic" />
//                             <button type="button" onClick={fetchQuestions}>Get AI Generated questions</button>
//                             {isLoading ? (
//                                 <p>Loading questions...</p>
//                             ) : (
//                                 <div>
//                                     {questions.map((question, index) => (
//                                         <div key={index}>
//                                             <input
//                                                 type="checkbox"
//                                                 checked={selectedQuestions.includes(question)}
//                                                 onChange={() => handleQuestionCheck(question)}
//                                             />
//                                             {question}
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}

//                             <button type="submit">Post Exam</button>
//                         </form>
//                     </section>
//                 </main>
//             </div>
//         </>
//     );
// };

// export default InstructorExams;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './main.css';

const InstructorExams = () => {
    const [fetchedExams, setFetchedExams] = useState([]);
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({
        examTitle: '',
        examDate: '',
        totalMarks: '',
        duration: '',
        courseId: ''
    });
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const [topic, setTopic] = useState(''); // State for topic
    const [questions, setQuestions] = useState([]); // State for fetched questions
    const [selectedQuestions, setSelectedQuestions] = useState([]); // State for selected questions

    useEffect(() => {
        axios.post('https://sxs3330.uta.cloud/wdm/Exams.php', { action: 'read' })
            .then(response => {
                setFetchedExams(response.data.exams);
            })
            .catch(error => {
                console.error('Error fetching the exams:', error);
            });

        axios.post('https://sxs3330.uta.cloud/wdm/courses.php', { action: 'read' })
            .then(response => {
                if (response.data.status === 'success') {
                    setCourses(response.data.data);
                    setForm(prevForm => ({
                        ...prevForm,
                        courseId: response.data.data[0].course_id
                    }));
                } else {
                    console.error('Error fetching courses:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleTopicChange = (e) => {
        setTopic(e.target.value);
    };

    const userId = localStorage.getItem('userId');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Ensure that all fields including questions are selected
        if (!form.examTitle || !form.examDate || !form.totalMarks || !form.duration || !form.courseId || selectedQuestions.length === 0) {
            alert("Please fill all fields and select at least one question for the exam.");
            return;
        }

        const formData = {
            action: 'create',
            exam_title: form.examTitle,
            deadline: form.examDate,
            total_marks: form.totalMarks,
            duration: form.duration,
            course_id: form.courseId,
            instructor_id: userId,
            questions: selectedQuestions.join(', ') // Joining selected questions into a single string
        };
        console.log("questions");

        console.log(questions);
        axios.post('https://sxs3330.uta.cloud/wdm/Exams.php', formData)
            .then(response => {
                if (response.data && response.data.result === 'Exam created') {
                    alert("Exam created successfully!");
                    setFetchedExams([...fetchedExams, response.data]);
                } else {
                    alert("Failed to create exam.");
                }
            })
            .catch(error => {
                console.error('Error creating new exam:', error);
                alert("An error occurred while creating the exam.");
            });
    };


    const fetchQuestions = () => {
        setIsLoading(true);
        axios.post('https://sxs3330.uta.cloud/wdm/instructor-ai.php', { topic })
            .then(response => {
                if (response.data && response.data.response) {
                    setQuestions(response.data.response.choices[0].message.content.split('\n'));
                }
            })
            .catch(error => console.error('Error fetching questions:', error))
            .finally(() => setIsLoading(false));
    };

    const handleQuestionCheck = (question) => {
        setSelectedQuestions(prevSelected => {
            if (prevSelected.includes(question)) {
                return prevSelected.filter(q => q !== question);
            } else {
                return [...prevSelected, question];
            }
        });
    };

    return (
        <>
            <nav id="top-navbar">
                <h1>Exams - Instructor Dashboard</h1>
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
                        <li><a href="/ai-tutor"><i className="fas fa-envelope"></i> AI-Tutor</a></li>
                        <li><a href="/homepage"><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                    </ul>
                </div>

                <main id="main-content">
                    <section id="exam-details">
                        <h2>Upcoming Exams</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Exam Title</th>
                                    <th>Deadline</th>
                                    <th>Total Marks</th>
                                    <th>Duration (min)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fetchedExams.map((exam, index) => (
                                    <tr key={index}>
                                        <td>{exam.exam_title}</td>
                                        <td>{exam.deadline}</td>
                                        <td>{exam.total_marks}</td>
                                        <td>{exam.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                    <section id="post-exam-section">
                        <h2>Post New Exam</h2>
                        <h4>Select Course:</h4>
                        <select
                            id="course-dropdown"
                            name="courseId"
                            value={form.courseId}
                            onChange={handleChange}
                            required
                        >
                            {courses.map((course) => (
                                <option key={course.id} value={course.course_id}>
                                    {course.course_name}
                                </option>
                            ))}
                        </select>

                        <form id="post-exam-form" onSubmit={handleFormSubmit}>
                            <label htmlFor="exam-title">Exam Title:</label>
                            <input
                                type="text"
                                id="exam-title"
                                name="examTitle"
                                value={form.examTitle}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="exam-date">Date:</label>
                            <input
                                type="date"
                                id="exam-date"
                                name="examDate"
                                value={form.examDate}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="total-marks">Total Marks:</label>
                            <input
                                type="number"
                                id="total-marks"
                                name="totalMarks"
                                value={form.totalMarks}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="duration">Duration (min):</label>
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                value={form.duration}
                                onChange={handleChange}
                                required
                            />
                            <h2>Fetch Exam Questions</h2>
                            <input type="text" value={topic} onChange={handleTopicChange} placeholder="Enter Topic" />
                            <button type="button" onClick={fetchQuestions}>Get AI Generated questions</button>
                            {isLoading ? (
                                <p>Loading questions...</p>
                            ) : (
                                <div>
                                    {questions.map((question, index) => (
                                        <div key={index}>
                                            <input
                                                type="checkbox"
                                                checked={selectedQuestions.includes(question)}
                                                onChange={() => handleQuestionCheck(question)}
                                            />
                                            {question}
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button type="submit">Post Exam</button>
                        </form>
                    </section>
                </main>
            </div>
        </>
    );
};

export default InstructorExams;