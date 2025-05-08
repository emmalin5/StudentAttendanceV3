// src/components/Curriculum/Level/LevelSection.tsx
import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from "@mui/material";
import { fetchLevels, createLevel, updateLevel, deleteLevel } from "../../../../src/services/CirrculumService";
import LevelCard from "./LevelModal";
import LevelForm from "./LevelForm";
import type { Level } from "../../../types";

const LevelSection: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [levelToDelete, setLevelToDelete] = useState<Level | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchLevels();
      setLevels(data);
    };
    load();
  }, []);

  const openCreateModal = () => {
    setSelectedLevel(null);
    setOpenModal(true);
  };

  const openEditModal = (level: Level) => {
    setSelectedLevel(level);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedLevel(null);
  };

  const handleSubmit = async (name: string, id?: number) => {
    if (id) {
      const updated = await updateLevel(id, { name });
      setLevels((prev) => prev.map((lvl) => (lvl.id === updated.id ? updated : lvl)));
    } else {
      const created = await createLevel({ name });
      setLevels((prev) => [...prev, created]);
    }
    handleCloseModal();
  };

  const confirmDelete = (level: Level) => {
    setLevelToDelete(level);
    setDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (levelToDelete) {
      await deleteLevel(levelToDelete.id);
      setLevels((prev) => prev.filter((lvl) => lvl.id !== levelToDelete.id));
      setDeleteConfirm(false);
    }
  };

  return (
    <Box>
      <Button variant="contained" sx={{ mb: 2 }} onClick={openCreateModal}>
        + Create Level
      </Button>
      <Paper sx={{ p: 2 }}>
        {levels.map((level) => (
          <LevelCard key={level.id} level={level} onEdit={openEditModal} onDelete={confirmDelete} />
        ))}
      </Paper>

      <LevelForm open={openModal} onClose={handleCloseModal} onSubmit={handleSubmit} level={selectedLevel ?? undefined} />

      <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
        <DialogTitle>Delete Level</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <strong>{levelToDelete?.name}</strong>?
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

export default LevelSection;
