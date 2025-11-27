import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TaskCard({task,onToggle,onDelete}) {
  return (
    <Card>
      <CardContent sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <Checkbox checked={task.completed} onChange={()=>onToggle(task.id)} />

          <div>
            <Typography
              variant="body1"
              sx={{textDecoration: task.completed ? 'line-through' : 'none'}}
            >
              {task.title}
            </Typography>
          </div>
        </div>

        <IconButton onClick={() => onDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
