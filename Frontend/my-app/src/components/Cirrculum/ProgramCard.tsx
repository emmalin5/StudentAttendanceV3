// src/components/ProgramCard.tsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface ProgramCardProps {
  program: any;
  onEdit: (program: any) => void;
  onDelete: (program: any) => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, onEdit, onDelete }) => {
  return (
    <Box borderBottom={1} borderColor="divider">
      <Box mb={2} display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h6">{program.name}</Typography>
        <Box mt={1}>
          <Button size="small" onClick={() => onEdit(program)}>
            <EditIcon /> Edit
          </Button>
          <Button size="small" color="error" onClick={() => onDelete(program)}>
            <DeleteIcon /> Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProgramCard;
