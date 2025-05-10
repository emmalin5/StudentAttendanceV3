// src/pages/StudentPage.tsx
import React from "react";
import StudentSection from "../components/Student/StudentSecion";

const StudentPage: React.FC = () => {
    console.log("StudentPage Render");
  return (
    <div>
      <h1>Student Management</h1>
      <StudentSection />
    </div>
  );
};

export default StudentPage;
