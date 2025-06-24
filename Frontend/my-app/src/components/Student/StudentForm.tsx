// src/components/Curriculum/Student/StudentForm.tsx
import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import type { Student } from "../../types";

interface StudentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (studentData: Omit<Student, "id">, id?: string) => void;
  student?: Student;
}

const StudentForm: React.FC<StudentFormProps> = ({ open, onClose, onSubmit, student }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [idCard, setIdCard] = useState("");
  const [socialSecurityNumber, setSocialSecurityNumber] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  useEffect(() => {
    if (student) {
      setFirstName(student.firstName);
      setLastName(student.lastName);
      setPlaceOfBirth(student.placeOfBirth);
      setDateOfBirth(student.dateOfBirth);
      setGender(student.gender);
      setIdCard(student.idCard);
      setSocialSecurityNumber(student.socialSecurityNumber);
      setStatus(student.status);
    } else {
      setFirstName("");
      setLastName("");
      setPlaceOfBirth("");
      setDateOfBirth("");
      setGender("Male");
      setIdCard("");
      setSocialSecurityNumber("");
      setStatus("active");
    }
  }, [student]);

  const handleSubmit = () => {
    const studentData: Omit<Student, "id"> = {
      firstName,
      lastName,
      placeOfBirth,
      dateOfBirth,
      gender,
      idCard,
      socialSecurityNumber,
      status,
      contact: {} as any, // assuming contact is an empty object here for simplicity
    };
    onSubmit(studentData, student?.id);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{student ? "Edit Student" : "Create Student"}</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Place of Birth"
          fullWidth
          value={placeOfBirth}
          onChange={(e) => setPlaceOfBirth(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
  <TextField
    label="Date of Birth"
    type="date"
    value={dateOfBirth}
    onChange={(e) => setDateOfBirth(e.target.value)}
    InputLabelProps={{
      shrink: true, // This keeps the label visible above the date
    }}
    sx={{ background: "white" }}
  />
</FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            label="Gender"
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="ID Card"
          fullWidth
          value={idCard}
          onChange={(e) => setIdCard(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Social Security Number"
          fullWidth
          value={socialSecurityNumber}
          onChange={(e) => setSocialSecurityNumber(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {student ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentForm;
