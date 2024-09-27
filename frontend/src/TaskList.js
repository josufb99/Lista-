import React from "react";

function TaskList({ tasks, toggleTaskCompletion }) {
  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <p>No hay tareas pendientes</p>
      ) : (
        tasks.map((task, index) => (
          <li key={index} className={task.priority + (task.completed ? " completed" : "")}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(index)}
            />
            <span>
              {task.text} <small>({task.date})</small>
            </span>
          </li>
        ))
      )}
    </ul>
  );
}

export default TaskList;
