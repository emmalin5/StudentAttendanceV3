import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  fetchCollegePeriods,
  createCollegePeriod,
  updateCollegePeriod,
  deleteCollegePeriod,
} from "../../services/ColleagePeriodService";
import CollegePeriodForm from "./CollegePeriodForm";
import CollegePeriodTable from "./CollegePeriodTable";
import type { CollegePeriod } from "../../types";

const CollegePeriodSection: React.FC = () => {
  const [collegePeriods, setCollegePeriods] = useState<CollegePeriod[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCollegePeriod, setSelectedCollegePeriod] = useState<CollegePeriod | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [collegePeriodToDelete, setCollegePeriodToDelete] = useState<CollegePeriod | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await fetchCollegePeriods();
      setCollegePeriods(data);
    };
    load();
  }, []);

  const openCreateModal = () => {
    setSelectedCollegePeriod(null);
    setOpenModal(true);
  };

  const openEditModal = (collegePeriod: CollegePeriod) => {
    setSelectedCollegePeriod(collegePeriod);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedCollegePeriod(null);
  };

  const handleSubmit = async (collegePeriodData: Omit<CollegePeriod, "id">, id?: number) => {
    if (id) {
      const updated = await updateCollegePeriod(id, { ...collegePeriodData });   
     } else {
      const created = await createCollegePeriod(collegePeriodData);
      setCollegePeriods((prev) => [...prev, created]);
    }
    handleCloseModal();
  };

  const confirmDelete = (collegePeriod: CollegePeriod) => {
    setCollegePeriodToDelete(collegePeriod);
    setDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (collegePeriodToDelete) {
      await deleteCollegePeriod(collegePeriodToDelete.id);
      setCollegePeriods((prev) => prev.filter((s) => s.id !== collegePeriodToDelete.id));
      setDeleteConfirm(false);
    }
  };

  const filteredCollegePeriods = collegePeriods.filter((s) =>
    `${s.name} ${s.shortName} ${s.startDate} ${s.endDate}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="contained" onClick={openCreateModal}>
          + Create College Period
        </Button>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      <CollegePeriodTable
        collegePeriods={filteredCollegePeriods}
        onEdit={openEditModal}
        onDelete={confirmDelete}
      />

      <CollegePeriodForm
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={selectedCollegePeriod ?? undefined}
      />

      <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
        <DialogTitle>Delete CollegePeriod</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{" "}
          <strong>{collegePeriodToDelete?.name}</strong>?
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

export default CollegePeriodSection;
