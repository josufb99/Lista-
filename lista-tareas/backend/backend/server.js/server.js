const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db/config'); // Conexión a MySQL
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para obtener todas las tareas
app.get('/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

// Ruta para añadir una nueva tarea
app.post('/tasks', (req, res) => {
  const { text, priority } = req.body;
  const query = 'INSERT INTO tasks (text, priority) VALUES (?, ?)';
  
  db.query(query, [text, priority], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Tarea creada', taskId: result.insertId });
  });
});

// Ruta para marcar una tarea como completada
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const query = 'UPDATE tasks SET completed = ? WHERE id = ?';
  db.query(query, [completed, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Tarea actualizada' });
  });
});

// Ruta para eliminar tareas completadas
app.delete('/tasks/completed', (req, res) => {
  const query = 'DELETE FROM tasks WHERE completed = true';
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Tareas completadas eliminadas' });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
