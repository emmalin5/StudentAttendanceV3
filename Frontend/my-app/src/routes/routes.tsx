import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/DashboardHome';
import CollegePeriodsPage from '../pages/CollegePeriodPage';
import CurriculumPage from '../pages/CurriculumPage';
import StudentDetail from '../components/Student/StudentDetail';
import StudentPage from '../pages/StudentPage';
import { Home } from '@mui/icons-material';
const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'calendar', element: <div>Calendar Page</div> },
      { path: 'classes', element: <div>Classes Page</div> },
      {
        path: 'students',
        children: [
          { index: true, element: <StudentPage /> },
          { path: ':id', element: <StudentDetail /> },
        ]
      },
      { path: 'professors', element: <div>Professors Page</div> },
      { path: 'attendance', element: <div>Attendance Page</div> },
      { path: 'grading', element: <div>Grading Page</div> },
      { path: 'admissions', element: <div>Admissions Page</div> },
      { path: 'curriculum', element: <CurriculumPage />,
      },   
      { path: 'periods', element: <CollegePeriodsPage /> },
      { path: 'reports', element: <div>Reports Page</div> },
      { path: 'account', element: <div>Account Page</div> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];

export default routesConfig;
