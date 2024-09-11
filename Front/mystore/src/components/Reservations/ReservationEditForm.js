import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ReservationEditForm = ({ reservation, fetchReservations }) => {
  const [editedReservation, setEditedReservation] = useState({
    reservationDate: reservation.reservationDate,
    status: reservation.status,
  });
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedReservation({ ...editedReservation, [name]: value });
  };

  const updateReservation = async () => {
    try {
      await axios.put(`https://localhost:7107/api/Reservations/${reservation.customerId}`, editedReservation);
      fetchReservations();
      handleClose();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000); // 5 seconds
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen} startIcon={<EditIcon />}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Reservation
          </Typography>
          <TextField
            name="status"
            label="Status"
            value={editedReservation.status}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            name="reservationDate"
            label="Date"
            type="date"
            value={editedReservation.reservationDate}
            onChange={handleInputChange}
            fullWidth
            sx={{ mt: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" color="primary" onClick={updateReservation} sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>
      {showAlert && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          onClose={() => setShowAlert(false)}
          sx={{
            mt: 2,
            position: 'fixed',
            bottom: '20px',
            right: '20px',
          }}
        >
          Reservation updated successfully!
        </Alert>
      )}
    </div>
  );
};

export default ReservationEditForm;
