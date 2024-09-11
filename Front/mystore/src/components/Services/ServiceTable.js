import React, { useState } from 'react';
import axios from 'axios'; 
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { Box, TextField } from '@mui/material';
import ServiceEditForm from './ServiceEditForm';

const ServiceTable = ({ services, fetchServices }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [deletedService, setDeletedService] = useState('');
  const [serviceName, setServiceName] = useState('');

  // Handlers para los cambios de filtro
  const handleServiceNameChange = (event) => {
    setServiceName(event.target.value);
  };

  // Función para aplicar filtros
  const filterServices = (service) => {
    return (
      (!serviceName || service.ServiceName.toLowerCase().includes(serviceName.toLowerCase()))
    );
  };

  // Función para eliminar servicio
  const deleteService = async (id) => {
    try {
      await axios.delete(`https://localhost:7107/api/Services/${id}`);
      fetchServices();
      setDeletedService(`Service ${id}`);
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {/* Controles de filtro */}
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <TextField
            id="service-name"
            label="Service Name"
            type="text"
            value={serviceName}
            onChange={handleServiceNameChange}
            sx={{ mr: 2 }}
            fullWidth
          />
        </Box>

        {/* Tabla de servicios filtrada */}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Service ID</TableCell>
                <TableCell>Service Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Available Slots</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.filter(filterServices).map((service) => (
                <TableRow key={service.ServiceID}>
                  <TableCell>{service.ServiceID}</TableCell>
                  <TableCell>{service.ServiceName}</TableCell>
                  <TableCell>{service.Description}</TableCell>
                  <TableCell>{service.Price}</TableCell>
                  <TableCell>{service.AvailableSlots}</TableCell>
                  <TableCell>
                    <ServiceEditForm service={service} fetchServices={fetchServices} />
                    <Button variant="contained" color="error" onClick={() => deleteService(service.ServiceID)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Snackbar para mostrar alertas */}
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          {deletedService} deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ServiceTable;
