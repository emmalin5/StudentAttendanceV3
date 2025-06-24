// src/components/Curriculum/Class/ClassTable.tsx
import React from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, Button
} from '@mui/material';
import type { UniversityClass } from '../../types/index';

interface ClassTableProps {
  classes: UniversityClass[];
  onEdit: (universityClass: UniversityClass) => void;
  onDelete: (id: string) => void;
}

const ClassTable: React.FC<ClassTableProps> = ({ classes, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Program ID</TableCell>
          <TableCell>Level ID</TableCell>
          <TableCell>Course ID</TableCell>
          <TableCell>College Period</TableCell>
          <TableCell>Days</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {classes.map((cls) => (
          <TableRow key={cls.id}>
            <TableCell>{cls.name}</TableCell>
            <TableCell>{cls.programId}</TableCell>
            <TableCell>{cls.levelId}</TableCell>
            <TableCell>{cls.courseId}</TableCell>
            <TableCell>{cls.collegePeriodId}</TableCell>
            <TableCell>{cls.schedule.days.join(', ')}</TableCell>
            <TableCell>{cls.schedule.startTime} - {cls.schedule.endTime}</TableCell>
            <TableCell>{cls.schedule.location}</TableCell>
            <TableCell>
              <Button size="small" onClick={() => onEdit(cls)}>Edit</Button>
              <Button size="small" color="error" onClick={() => onDelete(cls.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClassTable;
