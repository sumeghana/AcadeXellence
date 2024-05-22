import React from 'react';
import './main.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


const ProgramCoordinator = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [totals, setTotals] = useState({ total_courses: 0, total_students: 0 });


    const loadTodos = () => {
        axios.post('https://sxs3330.uta.cloud/wdm/todo.php', {
            action: 'get_todos'
        }).then(response => {
            setTodos(response.data.todos);
        }).catch(error => {
            console.error("Error fetching todos", error);
        });
    };


    const addTodo = () => {
        axios.post('https://sxs3330.uta.cloud/wdm/todo.php', {
            action: 'add_todo',
            user_id: 1,  // Replace with actual user ID
            todo: newTodo
        }).then(response => {
            loadTodos(); // Refresh the list
        }).catch(error => {
            console.error("Error adding todo", error);
        });
    };

    useEffect(() => {
        axios.post('https://sxs3330.uta.cloud/wdm/Users.php', {
            action: 'get_totals'
        }).then((response) => {
            setTotals(response.data);
        }).catch((error) => {
            console.error("There was an error fetching the data", error);
        });
        loadTodos();

    }, []);


    return (
        <div id="wrapper">
            <div id="sidebar">
                <ul>
                    <li><a href="pc-home"><i className="fas fa-home"></i> Profile</a></li>
                    <li><a href="programcoordinator-dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</a></li>
                    <li><a href="pc-course-management"><i className="fas fa-book"></i> Course Management</a></li>
                    <li><a href="pc-program-management"><i className="fas fa-book"></i> Program Management</a></li>
                    <li><a href="messages"><i className="fas fa-clipboard-check"></i> Messages</a></li>
                    <li><a href="homepage"><i className="fas fa-sign-out-alt"></i> Log out</a></li>
                </ul>
            </div>

            <main id="main-content">
                <h1>Welcome, Program Coordinator</h1>

                {/* Dashboard Widgets */}
                <div id="dashboard-widgets">
                    <div className="widget">
                        <h2>Total Courses</h2>
                        <p>{totals.total_courses}</p>
                    </div>


                    <div className="widget">
                        <h2>Current Students</h2>
                        <p>{totals.total_students}</p>
                    </div>
                </div>
                <div id="to-do-list">
                    <h2>To-Do List</h2>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={e => setNewTodo(e.target.value)}
                        placeholder="Enter new todo"
                    />
                    <button onClick={addTodo}>Add Todo</button>
                    <ul>
                        {todos.map((todo, index) => (
                            <li key={index}>{todo.todo}</li>
                        ))}
                    </ul>
                </div>
                {/* Spotlights */}
                <div id="spotlight">
                    <h2>Spotlights</h2>
                    <div id="faculty-spotlight">
                        <h3>Faculty of the Month: Prof. John Smith</h3>
                        <p>Specializing in AI and machine learning. Published three papers this year.</p>
                    </div>
                    <div id="student-spotlight">
                        <h3>Student of the Month: Emily Williams</h3>
                        <p>Has an excellent track record and is leading the college coding competition.</p>
                    </div>
                </div>


            </main>
        </div>
    );
};

export default ProgramCoordinator;
