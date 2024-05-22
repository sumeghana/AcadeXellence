import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import AboutUs from './webpages/AboutUs';
import AdminAnalytics from './webpages/AdminAnalytics';
import './webpages/main.css';
import AdminCourseManagement from './webpages/AdminCourseManagement';
import AdminDashboard from './webpages/AdminDashboard';
import AdminUserManagement from './webpages/AdminUserManagement';
import ForgotPassword from './webpages/ForgotPassword';
import Homepage from './webpages/Homepage';
import InstructorCourseManagement from './webpages/InstructorCourseManagement';
import InstructorDashboard from './webpages/InstructorDashboard';
import InstructorExams from './webpages/InstructorExams';
import InstructorGrades from './webpages/InstructorGrades';
import InstructorStudents from './webpages/InstructorStudents';
import Login from './webpages/Login';
import Messages from './webpages/Messages';
import ProgramCoordinator from './webpages/ProgramCoordinator';
import QAAudit from './webpages/QAAudit';
import QACourseReview from './webpages/QACourseReview';
import QAStudentPerformance from './webpages/QAStudentPerformance';

import Register from './webpages/Register';
import StudentDashboard from './webpages/StudentDashboard';
import StudentExams from './webpages/StudentExams';
import StudentGrades from './webpages/StudentGrades';
import StudentIndividualCourse from './webpages/StudentIndividualCourse';
import StudentSubjects from './webpages/StudentSubjects';
import ContactUs from './webpages/ContactUs';
import CourseSyllabus from './webpages/CourseSyllabus';
import PCInstPerformance from './webpages/ProgramCoordinatorPerformance';
import ProgramCoordinatorCourseManagement from './webpages/ProgramCoordinatorCourseManagement';
import ProgramCoordinatorHome from './webpages/ProgramCoordinatorHome';
import PCProgramManagement from './webpages/PCProgramManagement';

import QACompliance from './webpages/QACompliance';


import QADashboard from './webpages/QADashboard';
import UpdateProfile from './webpages/UpdateProfile';
import AddCourse from './webpages/AddCourse';
import QAQualityPolicies from './webpages/QAQualityPolicies';
import CourseCatalog from './webpages/CourseCatalog';
import AITutor from './webpages/ai-tutor';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/admin-analytics" element={<AdminAnalytics />} />
        <Route path="/admin-course-management" element={<AdminCourseManagement />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-user-management" element={<AdminUserManagement />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/instructor-course-management" element={<InstructorCourseManagement />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor-exams" element={<InstructorExams />} />
        <Route path="/course-syllabus" element={<CourseSyllabus />} />

        <Route path="/instructor-grades" element={<InstructorGrades />} />
        <Route path="/instructor-students" element={<InstructorStudents />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/programcoordinator-dashboard" element={<ProgramCoordinator />} />
        <Route path="/qa-audit" element={<QAAudit />} />
        <Route path="/qa-course-review" element={<QACourseReview />} />
        <Route path="/qa-student-performance" element={<QAStudentPerformance />} />
        <Route path="/qa-compliance" element={<QACompliance />} />

        <Route path="/register" element={<Register />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-exams" element={<StudentExams />} />
        <Route path="/student-grades" element={<StudentGrades />} />
        <Route path="/student-individual-course" element={<StudentIndividualCourse />} />
        <Route path="/student-subjects" element={<StudentSubjects />} />

        <Route path="/course-catalog" element={<CourseCatalog />} />

        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/pc-inst-performance" element={<PCInstPerformance />} />
        <Route path="/pc-course-management" element={<ProgramCoordinatorCourseManagement />} />
        <Route path="/pc-home" element={<ProgramCoordinatorHome />} />
        <Route path="/pc-program-management" element={<PCProgramManagement />} />

        <Route path="/update-profile" element={<UpdateProfile />} />

        <Route path="/qa-dashboard" element={<QADashboard />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/qa-qality-policies" element={<QAQualityPolicies />} />

        <Route path="/AI-tutor" element={<AITutor />} />

      </Routes>
    </Router>
  );
}

export default App;
