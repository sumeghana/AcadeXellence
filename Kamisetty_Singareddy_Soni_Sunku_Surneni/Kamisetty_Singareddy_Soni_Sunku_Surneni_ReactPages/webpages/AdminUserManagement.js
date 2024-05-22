import React, { useState } from 'react';
import './main.css';
// import Sidebar from "./Sidebar";
import axios from "axios";
// import React, { useState } from 'react';
// import './main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsersCog, faBook, faChartBar, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const AdminUserManagement = () => {
    const [userData, setUserData] = useState({
        userId: '',
        username: '',
        email: '',
        role: 'student',
        status: 'active'
    });
    const [isDataModified, setIsDataModified] = useState(false); // State to track data modification
    const [userLogs, setUserLogs] = useState([]); // State to store user log data
    const [isLogsModified, setIsLogsModified] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Make a POST request to the PHP endpoint using Axios
        axios.post('https://sxs3330.uta.cloud/wdm/Users.php?id=' + userData.userId, {
            action: 'edit',
            email: userData.email,
            username: userData.username,
            role: userData.role
        })
            .then(response => {
                // Handle the response from the PHP endpoint
                if (response.data.error) {
                    console.error(response.data.error);

                } else {
                    console.log(response.data.result);
                    setIsDataModified(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    // const fetchUserLogData = (e) => {
    //     const {name, value} = e.target;
    //     console.error(value);
    //     axios.get('https://mxk9854.uta.cloud/wdm/logs.php?id=' + value) // Replace with the correct endpoint URL
    //         .then(response => {
    //             setUserLogs(response.data); // Update the userLogs state with the received data
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // };

    const fetchUserLogData = (e) => {
        const { value } = e.target;
        console.log(value)
        axios.get('https://sxs3330.uta.cloud/wdm/logs.php?id=' + value)
            .then(response => {
                // Check if response.data is an array
                if (Array.isArray(response.data)) {
                    setUserLogs(response.data);
                    setIsLogsModified(true);
                } else {
                    console.error('Expected an array, but received:', response.data);
                    setUserLogs([]); // Reset or handle the non-array response appropriately
                }
            })
            .catch(error => {
                console.error(error);

            });
    };

    return (
        <div id="wrapper">
            <div id="sidebar">
                <ul>
                    <li><a href="admin-dashboard"><FontAwesomeIcon icon={faUsersCog} /> Admin Dashboard</a></li>
                    <li><a href="admin-user-management"><FontAwesomeIcon icon={faUsersCog} /> User Management</a></li>
                    <li><a href="admin-course-management"><FontAwesomeIcon icon={faBook} /> Course Management</a></li>
                    <li><a href="admin-analytics"><FontAwesomeIcon icon={faChartBar} /> Analytics</a></li>
                    <li><a href="messages"><FontAwesomeIcon icon={faCogs} /> Messages</a></li>
                    <li><a href="homepage"><FontAwesomeIcon icon={faSignOutAlt} /> Log out</a></li>
                </ul>
            </div>
            <main id="main-content">
                <h1>Edit User Data</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="userId">User ID:</label>
                    <input type="text" id="userId" name="userId" value={userData.userId} onChange={handleChange} />

                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} />

                    <label htmlFor="role">Role:</label>
                    <select id="role" name="role" value={userData.role} onChange={handleChange}>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="programcoordinator">Program Coordinator</option>
                        <option value="admin">admin</option>
                    </select>

                    <label htmlFor="status">Status:</label>
                    <select id="status" name="status" value={userData.status} onChange={handleChange}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <button type="submit" style={{ marginRight: '10px' }}>Submit Changes</button>
                    <button type="button" style={{ marginRight: '10px' }} value={userData.userId} onClick={fetchUserLogData}>Monitor User Activity</button>
                    {isDataModified && (
                        <p>Data has been successfully updated.</p>
                    )}
                </form>

                <h2>User Log</h2>
                <table id="userLogTable">
                    <thead>
                        <tr>
                            <th>Log ID</th>
                            <th>User ID</th>
                            <th>Action</th>
                            <th>Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLogsModified && (userLogs.map(log => (
                            <tr key={log.log_id}>
                                <td>{log.log_id}</td>
                                <td>{log.user_id || 'N/A'}</td>
                                <td>{log.action}</td>
                                <td>{log.timestamp}</td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default AdminUserManagement;

// import React, { useState } from 'react';
// import './main.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTachometerAlt, faUsersCog, faBook, faChartBar, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// const AdminUserManagement = () => {
//     const [userData, setUserData] = useState({
//         userId: '1002063330',
//         username: 'abc',
//         email: 'studentname@example.com',
//         role: 'student',
//         status: 'active'
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUserData({ ...userData, [name]: value });
//     };

//     return (
//         <div id="wrapper">
//             <div id="sidebar">
//                 <ul>
//                     <li><a href="admin-dashboard"><FontAwesomeIcon icon={faUsersCog} /> Admin Dashboard</a></li>
//                     <li><a href="admin-user-management"><FontAwesomeIcon icon={faUsersCog} /> User Management</a></li>
//                     <li><a href="admin-course-management"><FontAwesomeIcon icon={faBook} /> Course Management</a></li>
//                     <li><a href="admin-analytics"><FontAwesomeIcon icon={faChartBar} /> Analytics</a></li>
//                     <li><a href="messages"><FontAwesomeIcon icon={faCogs} /> Messages</a></li>
//                     <li><a href="homepage"><FontAwesomeIcon icon={faSignOutAlt} /> Log out</a></li>
//                 </ul>
//             </div>

//             <main id="main-content">
//                 <h1>Edit User Data</h1>
//                 <form id="editUserForm">
//                     <label htmlFor="userId">User ID:</label>
//                     <input type="text" id="userId" name="userId" value={userData.userId} readOnly onChange={handleChange} />

//                     <label htmlFor="username">Username:</label>
//                     <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} />

//                     <label htmlFor="email">Email:</label>
//                     <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} />

//                     <label htmlFor="role">Role:</label>
//                     <select id="role" name="role" value={userData.role} onChange={handleChange}>
//                         <option value="student">Student</option>
//                         <option value="instructor">Instructor</option>
//                     </select>

//                     <label htmlFor="status">Status:</label>
//                     <select id="status" name="status" value={userData.status} onChange={handleChange}>
//                         <option value="active">Active</option>
//                         <option value="inactive">Inactive</option>
//                     </select>

//                     <button type="button" style={{ marginRight: '10px' }} onClick={() => alert('Changes submitted (mock action)')}>Submit Changes</button>

//                 </form>

//                 <h2>User Log</h2>
//                 <table id="userLogTable">
//                     <thead>
//                         <tr>
//                             <th>Log ID</th>
//                             <th>Action</th>
//                             <th>Timestamp</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td>1</td>
//                             <td>User Login</td>
//                             <td>2023-09-25 10:00:00</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </main>
//         </div>
//     );
// };

// export default AdminUserManagement;
