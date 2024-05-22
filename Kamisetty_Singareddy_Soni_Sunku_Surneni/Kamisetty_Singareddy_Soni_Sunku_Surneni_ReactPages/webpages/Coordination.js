import React from 'react';
import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Coordination = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic for submitting the new collaboration
    };

    return (
        <div id="wrapper">
            {/* Side Navigation */}
            <div id="sidebar">
                <ul>
                    <li>
                        <a href="#">
                            <FontAwesomeIcon icon={faClipboardCheck} /> Collabaration
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <FontAwesomeIcon icon={faSignOutAlt} /> Log out
                        </a>
                    </li>
                </ul>
            </div>

            <div id="main-content">
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="newCollabaration">New Collabaration:</label>
                            <input type="text" id="newCollabaration" name="newCollabaration" required /><br /><br />
                            <input type="submit" value="Start" />
                        </form>
                    </div>
                </div>

                <h2>History</h2>
                <table>
                    <tr>
                        <th>Collabaration ID</th>
                        <th>Description</th>
                        <th>Action</th>
                        <th>Person</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Session 1</td>
                        <td><a href="#">Edit</a> | <a href="#">Delete</a></td>
                        <td><a href="#">Instructor</a></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Session 2</td>
                        <td><a href="#">Edit</a> | <a href="#">Delete</a></td>
                        <td><a href="#">Quality Assurance Manager</a></td>
                    </tr>
                    {/* Add more objectives as needed */}
                </table>
            </div>
        </div>
    );
};

export default Coordination;
