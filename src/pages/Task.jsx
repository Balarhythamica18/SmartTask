import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import TaskCard from '../components/TaskCard';

function loadTasks() {
  const raw = localStorage.getItem('tasks');
  return raw ? JSON.parse(raw) : [];
}

export default function Tasks() {
  const [tasks,setTasks] = useState(loadTasks);
  const [title,setTitle] = useState("");
  const [snack,setSnack] = useState("");

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const add = () => {
    if (!title) return setSnack("Enter task title");
    const t = { id: Date.now(), title, completed:false };
    setTasks(p => [t, ...p]);
    setTitle("");
    setSnack("Task added");
  };

  const toggle = id => {
    setTasks(p => p.map(t => t.id === id ? {...t,completed:!t.completed} : t));
  };

  const del = id => {
    setTasks(p => p.filter(t => t.id !== id));
    setSnack("Deleted");
  };

  return (
    <div>
      <Box sx={{display:'flex',gap:2,alignItems:'center'}}>
        <TextField label="New Task" value={title} fullWidth onChange={e=>setTitle(e.target.value)} />
        <Button variant="contained" onClick={add}>Add</Button>
      </Box>

      <div className="task-list">
        {tasks.length === 0 && <Typography sx={{mt:2}}>No tasks yet</Typography>}

        {tasks.map(t => (
          <TaskCard key={t.id} task={t} onToggle={toggle} onDelete={del} />
        ))}
      </div>

      <Snackbar open={!!snack} autoHideDuration={1500} message={snack} onClose={()=>setSnack("")} />
    </div>
  );
}
