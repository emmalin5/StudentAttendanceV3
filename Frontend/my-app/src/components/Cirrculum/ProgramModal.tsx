// src/components/ProgramForm.tsx
import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import ProgramModalWrapper from './ProgramModalWrapper';

interface ProgramFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, id?: number) => void;
  program?: { id: number; name: string };
}

const ProgramModal: React.FC<ProgramFormProps> = ({ open, onClose, onSubmit, program }) => {
  const [programName, setProgramName] = useState('');

  useEffect(() => {
    if (program) {
      setProgramName(program.name);
    } else {
      setProgramName('');
    }
  }, [program]);

  const handleSave = () => {
    if (programName.trim()) {
      onSubmit(programName, program?.id);
      onClose();
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

export default ProgramModal;
