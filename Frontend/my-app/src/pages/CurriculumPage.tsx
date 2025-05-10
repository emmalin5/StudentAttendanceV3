// src/pages/CurriculumPage.tsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  fetchPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../services/CirrculumService";
import ProgramCard from "../components/Cirrculum/ProgramCard";
import ProgramForm from "../components/Cirrculum/ProgramModal";
import LevelSection from "../components/Cirrculum/Level/LevelSection";
import CourseSection from "../components/Cirrculum/Course/CourseSection";
import ProgramSection from "../components/Cirrculum/Program/ProgramSection";
import type { Program } from "../types/index";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CurriculumPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [programToDelete, setProgramToDelete] = useState<Program | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  const handleProgramSubmit = async (name: string, id?: number) => {
    if (id) {
      const updated = await updateProgram(Number(id), { name });
      setPrograms((prev) =>
        prev.map((prog) => (prog.id === updated.id ? updated : prog))
      );
    } else {
      const created = await createProgram({ name });
      setPrograms((prev) => [...prev, created]);
    }
  };

  const confirmDelete = (program: Program) => {
    setProgramToDelete(program);
    setDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (programToDelete) {
      await deleteProgram(Number(programToDelete.id));
      setPrograms((prev) =>
        prev.filter((prog) => prog.id !== programToDelete.id)
      );
      setDeleteConfirm(false);
      setProgramToDelete(null);
    }
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchPrograms();
      setPrograms(data);
    };
    load();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Curriculum Management
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Curriculum tabs"
        >
          <Tab label="Programs" {...a11yProps(0)} />
          <Tab label="Levels" {...a11yProps(1)} />
          <Tab label="Course Catalog" {...a11yProps(2)} />

        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        {/* <Button variant="contained" sx={{ mb: 3 }} onClick={openCreateModal}>
          + Create Program
        </Button>
        <Paper elevation={3} sx={{ p: 2 }}>
          {programs.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onEdit={openEditModal}
              onDelete={confirmDelete}
            />
          ))}
        </Paper> */}
        <ProgramSection />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <LevelSection />
      </TabPanel>

      <TabPanel value={value} index={2}>
       <CourseSection />
      </TabPanel>

      <ProgramForm
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleProgramSubmit}
        program={selectedProgram || undefined}
      />

      <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
        <DialogTitle>Delete Program</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{" "}
          <strong>{programToDelete?.name}</strong>?
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

export default CurriculumPage;
