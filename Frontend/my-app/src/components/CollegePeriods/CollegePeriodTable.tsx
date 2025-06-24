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
  Stack,
 
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import type { CollegePeriod } from "../../types";

interface CollegePeriodTableProps {
  collegePeriods: CollegePeriod[];
  onEdit: (collegePeriod: CollegePeriod) => void;
  onDelete: (collegePeriod: CollegePeriod) => void;
}

const table_header: {
  label: string;
  align: "center" | "left" | "right" | "inherit" | "justify";
}[] = [
  { label: "Name", align: "left" },
  { label: "ShortName", align: "left" },
  { label: "Start Date", align: "left" },
  { label: "End Date", align: "left" },
  { label: "Resting Days", align: "left" },
  { label: "Actions", align: "left" },
];

const CollegePeriodTable: React.FC<CollegePeriodTableProps> = ({
  collegePeriods,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
      <Table sx={{ minWidth: 800 }} aria-label="collegePeriod table">
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
          {collegePeriods.map((collegePeriod) => (
            <TableRow key={collegePeriod.id} hover>
              <TableCell>{collegePeriod.name}</TableCell>
              <TableCell>{collegePeriod.shortName}</TableCell>
              <TableCell>{collegePeriod.startDate}</TableCell>
              <TableCell>{collegePeriod.endDate}</TableCell>

              <TableCell>
                {collegePeriod.restingDays.length > 0 ? (
                  collegePeriod.restingDays.map((day, index) => (
                    <Chip
                      key={index}
                      label={day}
                      sx={{ marginRight: 1, marginBottom: 1 }}
                    />
                  ))
                ) : (
                  <Typography>No resting days</Typography>
                )}
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button
                    size="small"
                    onClick={() => onEdit(collegePeriod)}
                    aria-label="edit collegePeriod">
                    <EditIcon fontSize="small" />
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => onDelete(collegePeriod)}
                    aria-label="delete collegePeriod">
                    <DeleteIcon fontSize="small" />
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollegePeriodTable;
