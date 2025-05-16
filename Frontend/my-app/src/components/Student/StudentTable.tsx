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
import { format } from "date-fns";
import type { Student } from "../../types";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const table_header: { label: string; align: "center" | "left" | "right" | "inherit" | "justify" }[] = [
  { label: "First Name", align: "left" },
  { label: "Last Name", align: "left" },
  { label: "Place of Birth", align: "left" },
  { label: "Date of Birth", align: "left" },
  { label: "Gender", align: "left" },
  { label: "ID Card", align: "left" },
  { label: "SSN", align: "left" },
  { label: "Status", align: "left" },
  { label: "Actions", align: "center" },
];

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table sx={{ minWidth: 800 }} aria-label="student table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            {table_header.map((col, index) => (
              <TableCell key={index} align={col.align}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {col.label}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} hover>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.placeOfBirth}</TableCell>
              <TableCell>
                {format(new Date(student.dateOfBirth), "MMMM dd, yyyy")}
              </TableCell>
              <TableCell>{student.gender}</TableCell>
              <TableCell>{student.idCard}</TableCell>
              <TableCell>{student.socialSecurityNumber}</TableCell>
              <TableCell>
                <Chip
                  label={student.status === "active" ? "Active" : "Inactive"}
                  color={student.status === "active" ? "success" : "warning"}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align={table_header[8].align}>
                <Button
                  size="small"
                  onClick={() => onEdit(student)}
                  aria-label="edit student"
                  sx={{ marginRight: 1 }}
                >
                  <EditIcon fontSize="small" />
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => onDelete(student)}
                  aria-label="delete student"
                >
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

