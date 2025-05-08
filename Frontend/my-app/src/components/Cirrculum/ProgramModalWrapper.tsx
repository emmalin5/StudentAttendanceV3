import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material';

interface ProgramModalWrapperProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

const ProgramModalWrapper: React.FC<ProgramModalWrapperProps> = ({
  title,
  open,
  onClose,
  onSubmit,
  children
}) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions sx={{ pr: 3, pb: 2 }}>
      <Button onClick={onClose}>Cancel</Button>
     <Button variant="contained" color="primary" onClick={onSubmit}>Save</Button>
     
    </DialogActions>
  </Dialog>
);

export default ProgramModalWrapper;
