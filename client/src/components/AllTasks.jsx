import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

    useEffect(() => {
        setTimeout(() => {
            axios.get('http://localhost:4000/api/tasks')
                .then(response => {
                    setTasks(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(`Error fetching tasks: ${error.message}`);
                    setLoading(false);
                });
        }, 1000);
    }, []);

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const totalPages = Math.ceil(tasks.length / tasksPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="all-tasks-container">
            <h1 className="all-tasks-title">All Tasks</h1>
            {loading && <p className="loading">Loading...</p>}
            {!loading && !error && (
                <>
                    {tasks.length === 0 ? (
                        <p className="no-tasks-message">No task available</p>
                    ) : (
                        <>
                            <ul className="task-list">
                                {currentTasks.map((task) => (
                                    <li key={task._id} className="task-item">
                                        <Link to={`/task-details/${task._id}`} className="task-link">
                                        {task.title} - {task.description}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="page-button"
                                    >
                                        Prev
                                    </button>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="page-button"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </>
            )}

        </div>
    );
};

export default AllTasks;
