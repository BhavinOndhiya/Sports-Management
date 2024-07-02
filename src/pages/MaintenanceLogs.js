import React from 'react';
import { Box, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const MaintenanceLogs = ({ maintenanceLogs }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Maintenance Logs
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Facility</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Technician</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintenanceLogs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.date}</TableCell>
                <TableCell>{log.facility}</TableCell>
                <TableCell>{log.description}</TableCell>
                <TableCell>{log.technician}</TableCell>
                <TableCell>{log.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MaintenanceLogs;
