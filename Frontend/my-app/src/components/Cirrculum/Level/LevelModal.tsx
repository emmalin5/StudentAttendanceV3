// src/components/Curriculum/Level/LevelCard.tsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Level } from '../../../types';

interface LevelCardProps {
  level: Level;
  onEdit: (level: Level) => void;
  onDelete: (level: Level) => void;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, onEdit, onDelete }) => {
  return (
    <Box
      borderBottom={1}
      borderColor="divider"
      mb={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="subtitle1">{level.name}</Typography>
      <Box>
        <Button size="small" onClick={() => onEdit(level)}>
          <EditIcon fontSize="small" /> Edit
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(level)}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </Box>
    </Box>
  );
};

export default LevelCard;
