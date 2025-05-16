// src/pages/StudentPage.tsx
import React from "react";
import StudentSection from "../components/Student/StudentSecion";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import CollegePeriodsPage from "./CollegePeriodPages";
import CollegePeriodSection from "../components/CollegePeriods/CollegePeriodSecion";

const StudentPage: React.FC = () => {
    console.log("StudentPage Render");
  return (
    <Box>
        <Typography variant="h4" gutterBottom>College Periods Management</Typography>
      <CollegePeriodSection />
    </Box>
  );
};

export default StudentPage;
