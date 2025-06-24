// // src/pages/CurriculumPage.tsx
import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography, Paper, Button } from '@mui/material';
import { fetchPrograms, fetchLevels } from '../../services/CirrculumService';
import ProgramCard from '../Cirrculum/ProgramCard';
import ProgramForm from './ProgramModal';  // Import the modal component
import type { Program } from '../../types/index';

import { Route, Routes } from "react-router-dom";


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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CurriculumDashboard: React.FC = () => {
  const [value, setValue] = useState(0);
  const [levels, setLevels] = useState([]);
  const [openModal, setOpenModal] = useState(false); // State to control modal visibility
  const [programs, setPrograms] = useState<Program[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenModal = () => {
    setOpenModal(true);  // Open the modal
  };

  const handleCloseModal = () => {
    setOpenModal(false);  // Close the modal
  };

  const handleProgramSubmit = (name: string) => {
    // Here, you would handle the program creation logic, like updating state or sending a request to the server.
    const newProgram = { id: Date.now(), name };  // Simple example of adding a new program.
    setPrograms([...programs, newProgram]);
  };

  useEffect(() => {
    const load = async () => {
      const programsData = await fetchPrograms();
      const levelsData = await fetchLevels();
      setPrograms(programsData);
      setLevels(levelsData);
    };
    load();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Curriculum Management
      </Typography>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Curriculum tabs"
        >
          <Tab label="Programs/Levels" {...a11yProps(0)} />
          <Tab label="Course Catalog" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <TabPanel value={value} index={0}>
        <Button variant="contained" sx={{ mb: 3 }} onClick={handleOpenModal}>
          + Create Program
        </Button>
        <Paper elevation={3} sx={{ p: 2 }}>
          {programs.map((program: any) => (
            <ProgramCard key={program.id} program={program} levels={levels} />
          ))}
        </Paper>
      </TabPanel>

      <TabPanel value={value} index={1}>
        {/* Course Catalog */}
        Coming soon!
      </TabPanel>

      {/* Program Creation Modal */}
      <ProgramForm open={openModal} onClose={handleCloseModal} onSubmit={handleProgramSubmit} />
    </Box>
  );
};

export default CurriculumDashboard;