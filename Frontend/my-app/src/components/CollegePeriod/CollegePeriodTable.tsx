import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { fetchCollegePeriods } from '../../services/ColleagePeriodService';

interface CollegePeriod {
  id: number;
  name: string;
  shortName: string;
  startDate: string;
  endDate: string;
  restingDays: string[];
}

interface CollegePeriodTableProps {
  onEdit: (data: CollegePeriod) => void;
}

const CollegePeriodTable: React.FC<CollegePeriodTableProps> = ({ onEdit }) => {
  const [periods, setPeriods] = useState<CollegePeriod[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCollegePeriods();
      setPeriods(data);
    };
    fetchData();
  }, []);

  // Function to calculate duration in months
  const calculateDurationInMonths = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return months;
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Period</TableCell>
            <TableCell>Resting Days</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {periods.map((p) => {
            const duration = calculateDurationInMonths(p.startDate, p.endDate);
            return (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.startDate} - {p.endDate}</TableCell>
                <TableCell>{p.restingDays.join(', ')}</TableCell>
                <TableCell>{duration} months</TableCell>
                <TableCell>
                  <Button variant="outlined" startIcon={<EditIcon />} onClick={() => onEdit(p)}>Edit</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollegePeriodTable;
