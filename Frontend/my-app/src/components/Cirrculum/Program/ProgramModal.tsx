// src/components/Curriculum/Program/ProgramCard.tsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Program } from '../../../types';

interface ProgramCardProps {
  program: Program;
  onEdit: (program: Program) => void;
  onDelete: (program: Program) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onEdit, onDelete }) => {
  return (
    <Box
      borderBottom={1}
      borderColor="divider"
      mb={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="subtitle1">{program.name}</Typography>
      <Box>
        <Button size="small" onClick={() => onEdit(program)}>
          <EditIcon fontSize="small" /> Edit
        </Button>
        <Button size="small" color="error" onClick={() => onDelete(program)}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </Box>
    </Box>
  );
};

export default ProgramCard;
