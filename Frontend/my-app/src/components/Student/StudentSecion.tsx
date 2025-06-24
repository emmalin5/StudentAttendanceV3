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
  fetchStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../../services/StudentService";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import type { Student } from "../../types";

const StudentSection: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await fetchStudents();
      setStudents(data);
    };
    load();
  }, []);

  const openCreateModal = () => {
    setSelectedStudent(null);
    setOpenModal(true);
  };

  const openEditModal = (student: Student) => {
    setSelectedStudent(student);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedStudent(null);
  };

  const handleSubmit = async (studentData: Omit<Student, "id">, id?: string) => {
    if (id) {
      const updated = await updateStudent(id, { id, ...studentData });
      setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    } else {
      const created = await createStudent(studentData);
      setStudents((prev) => [...prev, created]);
    }
    handleCloseModal();
  };

  const confirmDelete = (student: Student) => {
    setStudentToDelete(student);
    setDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (studentToDelete) {
      await deleteStudent(studentToDelete.id);
      setStudents((prev) => prev.filter((s) => s.id !== studentToDelete.id));
      setDeleteConfirm(false);
    }
  };

  // Filter students by search query
  const filteredStudents = students.filter((s) =>
    `${s.firstName} ${s.lastName} ${s.idCard} ${s.placeOfBirth}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Button variant="contained" onClick={openCreateModal}>
          + Create Student
        </Button>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      <StudentTable students={filteredStudents} onEdit={openEditModal} onDelete={confirmDelete} />

      <StudentForm
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        student={selectedStudent ?? undefined}
      />

      <Dialog open={deleteConfirm} onClose={() => setDeleteConfirm(false)}>
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{" "}
          <strong>
            {studentToDelete?.firstName} {studentToDelete?.lastName}
          </strong>
          ?
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

export default StudentSection;


