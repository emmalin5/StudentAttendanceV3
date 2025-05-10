// src/components/Curriculum/Program/ProgramForm.tsx
import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import ProgramModalWrapper from '../ProgramModalWrapper'; // You can reuse the same wrapper
import type { Program } from '../../../types';

interface ProgramFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, id?: number) => void;
  program?: Program;
}

const ProgramForm: React.FC<ProgramFormProps> = ({ open, onClose, onSubmit, program }) => {
  const [programName, setProgramName] = useState('');

  useEffect(() => {
    setProgramName(program?.name || '');
  }, [program]);

  const handleSave = () => {
    if (programName.trim()) {
      onSubmit(programName.trim(), program?.id);
      setProgramName('');
    }
  };

  const handleCancel = () => {
    setProgramName('');
    onClose();
  };

  return (
    <ProgramModalWrapper
      title={program ? 'Edit Program' : 'Create Program'}
      open={open}
      onClose={handleCancel}
      onSubmit={handleSave}
    >
      <TextField
        label="Program Name"
        fullWidth
        value={programName}
        onChange={(e) => setProgramName(e.target.value)}
        margin="normal"
      />
    </ProgramModalWrapper>
  );
};

export default ProgramForm;
