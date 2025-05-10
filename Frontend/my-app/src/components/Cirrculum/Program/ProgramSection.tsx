// src/components/Curriculum/Program/ProgramSection.tsx
import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from "@mui/material";
import { fetchPrograms, createProgram, updateProgram, deleteProgram } from "../../../../src/services/CirrculumService";
import ProgramCard from "./ProgramModal";
import ProgramForm from "./ProgramForm";
import type { Program } from "../../../types";

const ProgramSection: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchPrograms();
      setPrograms(data);
    };
    load();
  }, []);

  const openCreateModal = () => {
    setSelectedProgram(null);
    setOpenModal(true);
  };

  const openEditModal = (program: Program) => {
    setSelectedProgram(program);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedProgram(null);
  };

  const handleSubmit = async (name: string, id?: number) => {
    if (id) {
      const updated = await updateProgram(id, { name });
      setPrograms((prev) => prev.map((lvl) => (lvl.id === updated.id ? updated : lvl)));
    } else {
      const created = await createProgram({ name });
      setPrograms((prev) => [...prev, created]);
    }
    handleCloseModal();
  };

  const confirmDelete = (program: Program) => {
    setProgramToDelete(program);
    setDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (programToDelete) {
      await deleteProgram(programToDelete.id);
      setPrograms((prev) => prev.filter((lvl) => lvl.id !== programToDelete.id));
      setDeleteConfirm(false);
    }
  };

  return (
    <Box>
      <Button variant="contained" sx={{ mb: 2 }} onClick={openCreateModal}>
        + Create Program
      </Button>
      <Paper sx={{ p: 2 }}>
        {programs.map((program) => (
          <ProgramCard key={program.id} program={program} onEdit={openEditModal} onDelete={confirmDelete} />
        ))}
      </Paper>

      <ProgramForm open={openModal} onClose={handleCloseModal} onSubmit={handleSubmit} program={selectedProgram ?? undefined} />

      <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
        <DialogTitle>Delete Program</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{programToDelete?.name}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProgramSection;
