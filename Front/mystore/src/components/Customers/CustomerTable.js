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
import CustomerEditForm from './CustomerEditForm';

const CustomerTable = ({ customers, fetchCustomers }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [deletedCustomer, setDeletedCustomer] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Handlers para los cambios de filtro
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  // Función para aplicar filtros
  const filterCustomers = (customer) => {
    return (
      (!firstName || customer.FirstName.toLowerCase().includes(firstName.toLowerCase())) &&
      (!lastName || customer.LastName.toLowerCase().includes(lastName.toLowerCase()))
    );
  };

  // Función para eliminar cliente
  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`https://localhost:7107/api/Customers/${id}`);
      fetchCustomers();
      setDeletedCustomer(`Customer ${id}`);
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting customer:', error);
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
            id="first-name"
            label="First Name"
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            sx={{ mr: 2 }}
            fullWidth
          />
          <TextField
            id="last-name"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            sx={{ mr: 2 }}
            fullWidth
          />
        </Box>

        {/* Tabla de clientes filtrada */}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Customer ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.filter(filterCustomers).map((customer) => (
                <TableRow key={customer.CustomerID}>
                  <TableCell>{customer.CustomerID}</TableCell>
                  <TableCell>{customer.FirstName}</TableCell>
                  <TableCell>{customer.LastName}</TableCell>
                  <TableCell>{customer.Email}</TableCell>
                  <TableCell>{customer.Phone}</TableCell>
                  <TableCell>
                    <CustomerEditForm customer={customer} fetchCustomers={fetchCustomers} />
                    <Button variant="contained" color="error" onClick={() => deleteCustomer(customer.CustomerID)}>
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
          {deletedCustomer} deleted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomerTable;
