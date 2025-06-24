// src/components/Curriculum/Level/LevelForm.tsx
import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import ProgramModalWrapper from '../ProgramModalWrapper'; // You can reuse the same wrapper
import type { Level } from '../../../types';

interface LevelFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, id?: number) => void;
  level?: Level;
}

const LevelForm: React.FC<LevelFormProps> = ({ open, onClose, onSubmit, level }) => {
  const [levelName, setLevelName] = useState('');

  useEffect(() => {
    setLevelName(level?.name || '');
  }, [level]);

  const handleSave = () => {
    if (levelName.trim()) {
      onSubmit(levelName.trim(), level?.id);
      setLevelName('');
    }
  };

  const handleCancel = () => {
    setLevelName('');
    onClose();
  };

  return (
    <ProgramModalWrapper
      title={level ? 'Edit Level' : 'Create Level'}
      open={open}
      onClose={handleCancel}
      onSubmit={handleSave}
    >
      <TextField
        label="Level Name"
        fullWidth
        value={levelName}
        onChange={(e) => setLevelName(e.target.value)}
        margin="normal"
      />
    </ProgramModalWrapper>
  );
};

export default LevelForm;
