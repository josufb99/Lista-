import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import axios from "axios";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("normal");
  const [tasks, setTasks] = useState([]);

  // Cargar tareas desde localStorage cuando la aplicación se monta
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Guardar tareas en localStorage cada vez que cambia el estado de tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);


  useEffect(() => {
    axios.get("http://localhost:3001/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Función para agregar una nueva tarea
  const addTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    const newTask = {
      text: task,
      priority: priority,
      completed: false,
      date: new Date().toLocaleString(),
    };

    setTasks([...tasks, newTask]);
    setTask(""); // Limpiar la caja de texto
  };

  // Alternar el estado de "completado" de una tarea
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  
  const clearCompletedTasks = () => {
    const remainingTasks = tasks.filter((task) => !task.completed);
    setTasks(remainingTasks);
  };

  return (
    <div className="container">
      <h1>Lista de Tareas</h1>
      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Escribe una tarea"
          maxLength="50"
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="importante">Importante</option>
        </select>
        <button type="submit">✅</button>
      </form>

      <TaskList tasks={tasks} toggleTaskCompletion={toggleTaskCompletion} />

      <button className="clear-btn" onClick={clearCompletedTasks}>
       Borrar
      </button>
    </div>
  );
}

export default App;
