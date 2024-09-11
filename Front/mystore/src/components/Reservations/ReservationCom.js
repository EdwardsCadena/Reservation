import React from 'react';
import Grid from '@mui/material/Grid';
import ReservationForm from './ReservationForm'; // Asegúrate de que el archivo se llame así
import ReservationTable from './ReservationTable'; // Asegúrate de que el archivo se llame así

const ReservationCom = ({ reservations, fetchReservations }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1}></Grid>
      <Grid item xs={3}>
        <ReservationForm reservations={reservations} fetchReservations={fetchReservations} />
      </Grid>
      <Grid item xs={6}>
        <ReservationTable reservations={reservations} fetchReservations={fetchReservations} />
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default ReservationCom;
