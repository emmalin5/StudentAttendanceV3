// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem,
//   Typography,
//   Grid,
//   Paper,
//   IconButton,
//   Tabs,
//   Tab,
//   Select,
//   InputLabel,
//   FormControl,
//   Checkbox,
//   ListItemText,
//  Table,
//  TableContainer,
//  TableHead,
//  TableBody,
//  TableRow,
//  TableCell
// } from "@mui/material";
// import Divider from '@mui/material/Divider';



// import { Add, Edit, Delete } from "@mui/icons-material";
// import {
//   createClass,
//   deleteClass,
//   getClasses,
//   updateClass,
// } from "../services/ClassService";
// import type {
//   UniversityClass,
//   Program,
//   Level,
//   Course,
//   CollegePeriod,
//   Schedule,
// } from "../types/index";
// import axios from "axios";
// import { Box, flex } from "@mui/system";
// import ClassTable from "../components/Class/ClassTable";
// const initialSchedule: Schedule = {
//   days: [],
//   time: "",
//   location: "",
// };

// const defaultClass: Partial<UniversityClass> = {
//   id: "",
//   name: "",
//   programId: "",
//   levelId: "",
//   courseId: "",
//   collegePeriodId: "",
//   registeredStudentIds: [],
//   schedule: initialSchedule,
// };

// const dayOptions = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

// const ClassPage: React.FC = () => {
//   const [value, setValue] = useState(0);
//   const [classes, setClasses] = useState<UniversityClass[]>([]);
//   const [programs, setPrograms] = useState<Program[]>([]);
//   const [levels, setLevels] = useState<Level[]>([]);
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [periods, setPeriods] = useState<CollegePeriod[]>([]);
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] =
//     useState<Partial<UniversityClass>>(defaultClass);
//   const [editId, setEditId] = useState<string | null>(null);

//   const API = "http://localhost:3001";

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   const fetchAll = async () => {
//     const [classRes, progRes, levelRes, courseRes, periodRes] =
//       await Promise.all([
//         getClasses(),
//         axios.get(`${API}/programs`).then((res) => res.data),

//         axios.get(`${API}/levels`).then((res) => res.data),

//         axios.get(`${API}/courses`).then((res) => res.data),
//         axios.get(`${API}/collegePeriods`).then((res) => res.data),
//       ]);

//     setClasses(classRes);
//     setPrograms(progRes);
//     setLevels(levelRes);
//     setCourses(courseRes);
//     setPeriods(periodRes);
//   };
//   //console.log("Fetching Levels:", levels);
//   {
//     levels.map((l) => console.log(l.name));
//   }

//   const handleOpen = (cls?: UniversityClass) => {
//     if (cls) {
//       setFormData(cls);
//       setEditId(cls.id);
//     } else {
//       setFormData(defaultClass);
//       setEditId(null);
//     }
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setFormData(defaultClass);
//     setEditId(null);
//   };

//   const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     if (name.startsWith("schedule.")) {
//       const key = name.split(".")[1] as keyof Schedule;
//       setFormData((prev) => ({
//         ...prev,
//         schedule: {
//           ...prev.schedule!,
//           [key]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   const handleSubmit = async () => {
//     if (editId) {
//       await updateClass(formData as UniversityClass);
//     } else {
//       await createClass({
//         ...(formData as UniversityClass),
//         id: Date.now().toString(),
//       });
//     }
//     fetchAll();
//     handleClose();
//   };

//   const handleDeleteClick = async (id: string) => {
//     await deleteClass(id);
//     fetchAll();
//   };

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Classes and Students Enrollment
//       </Typography>
//       <Tabs value={value} onChange={handleTabChange} aria-label="class tabs">
//         <Tab label="Enrollment" {...a11yProps(0)} />
//         <Tab label="Classes" {...a11yProps(1)} />
//       </Tabs>

//       <TabPanel value={value} index={0}>
//         <Typography variant="h6">Content for Enrollment</Typography>
//       </TabPanel>

//       <TabPanel value={value} index={1}>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => handleOpen()}>
//           Add Class
//         </Button>

//         {/* <Grid container spacing={2} sx={{ marginTop: 2, display: "flex" }}>
//           {classes.map((cls) => (
//             <Grid component="div" key={cls.id}>
//             <Paper sx={{ padding: 2}}>
//             <Grid component="div">
//               <Typography variant="h6">{cls.name}</Typography>
//               <Typography>
//                 Program: {programs.find((p) => p.id.toString() === cls.programId)?.name}
//               </Typography>
//               <Typography>
//                 Year: {levels.find((l) => l.id.toString() === cls.levelId)?.name}
//               </Typography>
//               <Typography>
//                 Course: {courses.find((c) => c.id.toString() === cls.courseId)?.name}
//               </Typography>
//               <Typography>
//                 Period: {
//                   periods.find((p) => p.id.toString() === cls.collegePeriodId)?.name
//                 }
//               </Typography>
//               <Typography>Days: {cls.schedule.days.join(", ")}</Typography>
//               <Typography>Time: {cls.schedule.time}</Typography>
//               <Typography>Location: {cls.schedule.location}</Typography>
//             </Grid>
//               <Box sx={{ display: "flex", flexDirection: "row"}}>
//                 <Button variant="contained" color="info" onClick={() => handleOpen(cls)} sx={{ marginRight: 3, marginTop: 2, paddingRight: 2, paddingLeft: 2  }}>
//                   <Edit sx={{ marginRight: 1 }} /> Edit
//                 </Button>
//                 <Button variant="contained" color="error"  sx={{ marginTop: 2, paddingRight: 2, paddingLeft: 2  }}
//                   onClick={() => handleDeleteClick(cls.id)}>
//                   <Delete sx={{ marginRight: 1 }} />Delete
//                 </Button>
//               </Box>
//             </Paper>
//           </Grid>
          
//           ))}
//         </Grid> */}
       
//         <ClassTable classes = {classes} courses={courses} Periods={periods} onEdit={handleOpen} onDelete={handleDeleteClick}/>
        



//       </TabPanel>

//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//         <DialogTitle>{editId ? "Edit Class" : "Add Class"}</DialogTitle>
//         <DialogContent dividers>
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Name"
//             name="name"
//             value={formData.name || ""}
//             onChange={handleChangeForm}
//           />

//           <TextField
//             select
//             fullWidth
//             margin="normal"
//             label="Course"
//             name="courseId"
//             value={formData.courseId || ""}
//             onChange={handleChangeForm}>
//             {courses.map((c) => (
//               <MenuItem key={c.id} value={c.id.toString()}>
//                 {c.name}
//               </MenuItem>
//             ))}
//           </TextField>

//           <TextField
//             select
//             fullWidth
//             margin="normal"
//             label="College Period"
//             name="collegePeriodId"
//             value={formData.collegePeriodId || ""}
//             onChange={handleChangeForm}>
//             {periods.map((p) => (
//               <MenuItem key={p.id} value={p.id.toString()}>
//                 {p.name}
//               </MenuItem>
//             ))}
//           </TextField>

//           <FormControl fullWidth margin="normal">
//             <InputLabel id="schedule-days-label" sx={{ background: "white", padding: "0 4px" }}>Schedule Days</InputLabel>
//             <Select 
//               labelId="schedule-days-label"
//               multiple
//               value={formData.schedule?.days || []}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   schedule: {
//                     ...prev.schedule!,
//                     days:
//                       typeof e.target.value === "string"
//                         ? e.target.value.split(",")
//                         : e.target.value,
//                   },
//                 }))
//               }
//               renderValue={(selected) => (selected as string[]).join(", ")}>
//               {dayOptions.map((day) => (
                
//                 <MenuItem  key={day} value={day}>
//                   <Checkbox
//                     checked={formData.schedule?.days?.includes(day) || false}
//                   />
//                   <ListItemText primary={day} />
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <TextField
//             fullWidth
//             margin="normal"
//             label="Schedule Time"
//             name="schedule.time"
//             value={formData.schedule?.time || ""}
//             onChange={handleChangeForm}
//           />
//           <TextField
//             fullWidth
//             margin="normal"
//             label="Location"
//             name="schedule.location"
//             value={formData.schedule?.location || ""}
//             onChange={handleChangeForm}
//           />
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSubmit} variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel({ children, value, index, ...other }: TabPanelProps) {
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`tabpanel-${index}`}
//       aria-labelledby={`tab-${index}`}
//       {...other}>
//       {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `tab-${index}`,
//     "aria-controls": `tabpanel-${index}`,
//   };
// }

// export default ClassPage;

import ClassSection from "../components/Class/ClassSection";

const ClassPage = () => {
  return <ClassSection />;
};

export default ClassPage;