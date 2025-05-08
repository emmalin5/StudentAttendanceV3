import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button } from '@mui/material';

interface ModalWrapperProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ title, open, onClose, onSave, children }) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent sx={{ mb: 1 }}>{children}</DialogContent>
    <DialogActions sx={{ mb: 2 , mr: 2 }}>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="contained" color="primary" onClick={onSave}>Save</Button>
    </DialogActions>
  </Dialog>
);

export default ModalWrapper;