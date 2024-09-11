import React, { useState } from 'react';
import axios from 'axios';
import { Grid, TextField, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const ReservationForm = ({ fetchReservations }) => {
  const [status, setStatus] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7107/api/Reservations', { status, reservationDate });
      fetchReservations();
      setStatus('');
      setReservationDate('');
      setShowAlert(true);
    } catch (error) {
      console.error('Error adding reservation:', error);
    }
  };

  const handleCloseAlert = () => setShowAlert(false);

  return (
    <>
      <h1>Register Reservation</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Status"
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date"
              type="date"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              variant="filled"
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="success" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={showAlert}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          Reservation registered successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReservationForm;
