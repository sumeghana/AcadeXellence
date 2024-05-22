import React from 'react';
import './main.css'; // Make sure the path to your CSS file is correct

const QACompliance = () => {
    return (
        <div id="wrapper">
            <div id="sidebar">
                <ul>
                    <li><a href="qa-dashboard"><i className="fas fa-tachometer-alt"></i> QA Dashboard</a></li>
                    <li><a href="qa-course-review"><i className="fas fa-book"></i> Review</a></li>
                    <li><a href="qa-audit"><i className="fas fa-file-alt"></i> Audits & Evaluations</a></li>
                    <li><a href="qa-student-performance"><i className="fas fa-chart-line"></i> Student Performance</a></li>
                    <li><a href="qa-qality-policies"><i className="fas fa-cogs"></i> Process and Policies </a></li>
                    <li><a href="messages"><i className="fas fa-cogs"></i> Messages </a></li>
                    <li><a href="homepage"><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                </ul>
            </div>

            <main id="main-content">
                <h1>Compliance & Accreditation</h1>
                <section id="compliance">
                    <h2>Regulatory Compliance</h2>
                    <p>We have ensured that our curriculum is in compliance with all relevant state and federal educational regulations.</p>
                </section>

                <section id="accreditation">
                    <h2>Accreditation Status</h2>
                    <p>We are accredited by XYZ and ABC educational bodies, and we consistently undergo evaluations to maintain these accreditations.</p>
                </section>

                <section id="audits">
                    <h2>Audit Records</h2>
                    <p>Our last audit was on June 30, 2023, and the results were satisfactory, with minor recommendations for improvement.</p>
                </section>
            </main>
        </div>
    );
};

export default QACompliance;
