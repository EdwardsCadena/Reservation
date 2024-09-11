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
import ReservationEditForm from './ReservationEditForm';

const ReservationTable = ({ reservations, fetchReservations }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [deletedReservation, setDeletedReservation] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [reservationDate, setReservationDate] = useState('');

  // Handlers para los cambios de filtro
  const handleCustomerIdChange = (event) => {
    setCustomerId(event.target.value);
  };

  const handleServiceIdChange = (event) => {
    setServiceId(event.target.value);
  };

  const handleReservationDateChange = (event) => {
    setReservationDate(event.target.value);
  };

  // Función para aplicar filtros
  const filterReservations = (reservation) => {
    const reservationDateObj = new Date(reservation.reservationDate).toISOString().split('T')[0];

    return (
      (!customerId || reservation.customerId.includes(customerId)) &&
      (!serviceId || reservation.serviceId.includes(serviceId)) &&
      (!reservationDate || reservationDateObj === reservationDate)
    );
  };

  // Función para eliminar reserva
  const deleteReservation = async (id) => {
    try {
      await axios.delete(`https://localhost:7107/api/Reservations/${id}`);
      fetchReservations();
      setDeletedReservation(`Reservation ${id}`);
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting reservation:', error);
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
            id="customer-id"
            label="Customer ID"
            type="text"
            value={customerId}
            onChange={handleCustomerIdChange}
            sx={{ mr: 2 }}
            fullWidth
          />
          <TextField
            id="service-id"
            label="Service ID"
            type="text"
            value={serviceId}
            onChange={handleServiceIdChange}
            sx={{ mr: 2 }}
            fullWidth
          />
          <TextField
            id="reservation-date"
            label="Reservation Date"
            type="date"
            value={reservationDate}
            onChange={handleReservationDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Box>

        {/* Tabla de reservas filtrada */}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Customer ID</TableCell>
                <TableCell>Service ID</TableCell>
                <TableCell>Reservation Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.filter(filterReservations).map((reservation) => (
                <TableRow key={reservation.customerId}>
                  <TableCell>{reservation.customerId}</TableCell>
                  <TableCell>{reservation.serviceId}</TableCell>
                  <TableCell>{new Date(reservation.reservationDate).toLocaleString()}</TableCell>
                  <TableCell>{reservation.status}</TableCell>
                  
                  <TableCell>
                    <Button variant="contained" color="error" onClick={() => deleteReservation(reservation.customerId)}>
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
          Reservation "{deletedReservation}" deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReservationTable;
