import { Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import DashboardHome from '../pages/DashboardHome';
import CollegePeriodsPage from '../pages/CollegePeriodPages';
import CollegePeriodPage from '../pages/CollegePeriodPage';
import CurriculumPage from '../pages/CurriculumPage';
import StudentPage from '../pages/StudentPage';
import ClassPage from '../pages/ClassPage';
const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: 'calendar', element: <div>Calendar Page</div> },
      { path: 'classes', element: <ClassPage /> },
      { path: 'students', element:<StudentPage />  },
      { path: 'professors', element: <div>Professors Page</div> },
      { path: 'attendance', element: <div>Attendance Page</div> },
      { path: 'grading', element: <div>Grading Page</div> },
      { path: 'admissions', element: <div>Admissions Page</div> },
      { path: 'curriculum', element: <CurriculumPage />,
      },   
      { path: 'periods', element: <CollegePeriodPage /> },
      { path: 'reports', element: <div>Reports Page</div> },
      { path: 'account', element: <div>Account Page</div> },
      { path: '*', element: <Navigate to="/" /> },
    ],
  },
];

export default routesConfig;
