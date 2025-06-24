import * as React from 'react';
import type { FC } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DashboardHome: FC = () => {
  console.log('DashboardHome component rendered');

  return (
    
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}
        gap={3}
        mb={4}
      >
        <Card>
          <CardContent>
            <Typography variant="h6">Total Students</Typography>
            <Typography variant="h4">1,250</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">Active Classes</Typography>
            <Typography variant="h4">32</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">Attendance Rate</Typography>
            <Typography variant="h4">92%</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6">New Admissions</Typography>
            <Typography variant="h4">48</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Welcome Section */}
      <Box>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Welcome, Admin!
          </Typography>
          <Typography>
            You're all caught up on your tasks. Here's what’s happening today.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default DashboardHome;
