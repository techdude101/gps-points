import React from 'react';
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Todo.css';

export default function Todo({ id, text, complete, todos, setTodos }) {
    function deleteHandler() {
        const remainingTodos = todos.filter(todo => todo.id !== id);
        setTodos(remainingTodos);
    }

    function setComplete() {
        const updatedTodos = todos.map(task => {
            if (id === task.id) {
                return { ...task, complete: !task.complete }
            }
            return task;
        });
        setTodos(updatedTodos);
    }
    return (
        <div>
            <li className="todo-li">
                <span onClick={setComplete} id="todo-text" className={`todo-text ${complete ? "todo-text__complete" : ""}`}>{text}</span>
                <span id="todo-icons" className="todo-icons">
                    <FontAwesomeIcon icon={faCheckCircle} className="todo-complete" onClick={setComplete} />
                    <FontAwesomeIcon icon={faTrash} className="todo-delete" onClick={deleteHandler} />
                </span>
            </li>
        </div>
    );
}