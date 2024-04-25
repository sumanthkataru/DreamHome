import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux'; 
import store from './store'; 

import UserDashboard from './Components/UserDashboard/UserDashboard';
import ClientDashboard from './Components/ClientDashboard/ClientDashboard';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import Homepage from './Components/Homepage/Homepage';
import PaymentForm from './Components/UserDashboard/PaymentForm';




const App = () => {
  // Use useSelector to access the loggedIn state from Redux store
  const isLoggedIn = useSelector(state => state.user.loggedIn);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Homepage route always rendered */}
          <Route path="/" element={<Homepage />} />
          {/* Dashboard routes conditionally rendered based on isLoggedIn */}
          {isLoggedIn && (
            <>
              <Route path="/user" element={<UserDashboard />} />
              <Route path="/client" element={<ClientDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
           
            </>
          )}
          {/* Route for payment form */}
   
          {/* <Route path="/payment" element={<PaymentForm />} /> */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
  