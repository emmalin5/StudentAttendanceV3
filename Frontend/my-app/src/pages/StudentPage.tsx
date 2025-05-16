// src/pages/StudentPage.tsx
import React from "react";
import StudentSection from "../components/Student/StudentSecion";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const StudentPage: React.FC = () => {
    console.log("StudentPage Render");
  return (
    <Box>
        <Typography variant="h4" gutterBottom>Students Management</Typography>
      <StudentSection />
    </Box>
  );
};

export default StudentPage;
