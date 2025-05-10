// src/components/Curriculum/Student/StudentTable.tsx
import React from "react";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import type { Student } from "../../types";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="student table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            {[
              "First Name",
              "Last Name",
              "Place of Birth",
              "Date of Birth",
              "Gender",
              "ID Card",
              "SSN",
              "Status",
              "Actions",
            ].map((header, index) => (
              <TableCell
                key={index}
                align={header === "Actions" ? "center" : "left"}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {header}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.placeOfBirth}</TableCell>
              <TableCell>{student.dateOfBirth}</TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.idCard}</TableCell>
              <TableCell>{student.socialSecurityNumber}</TableCell>
              <TableCell>
                <Chip
                  label={student.status === "active" ? "Active" : "Inactive"}
                  color={student.status === "active" ? "success" : "default"}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right">
                <Button
                  size="small"
                  onClick={() => onEdit(student)}
                  sx={{ marginRight: 1 }}>
                  <EditIcon fontSize="small" />
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => onDelete(student)}>
                  <DeleteIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;
