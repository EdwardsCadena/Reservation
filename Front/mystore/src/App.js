import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReservationList from './components/Reservations/ReservationTable'; // Verifica la ruta aquí
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('https://localhost:7107/api/Reservations');
      setReservations(response.data.data); // Asegúrate de acceder al campo correcto
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []); 

  return (
    <Router>
      <div>
        <Navbar />
        <h1>Reservation Management System</h1>
        <Switch>
          <Route path="/reservations">
            <ReservationList reservations={reservations} fetchReservations={fetchReservations} />
          </Route>
          {/* Agrega otras rutas aquí si es necesario */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
