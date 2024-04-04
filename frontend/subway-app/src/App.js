import "./styles/App.css";
import "./styles/index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import Home from "./components/admin/Home";
import UserList from "./components/admin/UserList";
import TripsList from "./components/admin/TripsList";
import User from "./components/admin/User";
import NewUser from "./components/admin/NewUser";
import CoinsRequests from "./components/admin/CoinsRequests";
import StationsList from "./components/admin/StationsList";
import AdminLogin from "./components/admin/AdminLogin";
import RidesList from "./components/admin/RidesList";
import FeedbacksList from "./components/admin/FeedbacksList";
import MessagesList from "./components/admin/MessagesList";
import Station from "./components/admin/Station";
import Trips from "./components/admin/Trips";
import Rides from "./components/admin/Rides";
import NewStation from "./components/admin/NewStation";
import NewTrip from "./components/admin/NewTrip";
import NewRide from "./components/admin/NewRide";
import NewMessage from "./components/admin/NewMessage";
import Profile from "./components/passenger/profile";
import Login from "./components/passenger/Login";
import MapRides from "./components/passenger/MapRides";
import Landing from "./components/passenger/Landing";
import TripReview from "./components/passenger/TripReview";
import MaP from "./components/passenger/Map";
import Register from './components/passenger/Register';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />} />
          <Route path="/tripreview/:tripId" element={<TripReview />} />
          <Route path="/" element={<Landing/>} />
          <Route path="/admin" element={<Home />} />

          <Route path="/users" element={<UserList />} />
          <Route path="/stations" element={<StationsList />} />
           <Route path="/rides" element={<RidesList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/trip/:tripId" element={<Trips />} />
          <Route path="/ride/:rideId" element={<Rides />} />
          <Route path="/station/:stationId" element={<Station />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<MapRides />} />
          <Route path="/coins_requests" element={<CoinsRequests />} />
          <Route path="/newUser" element={<NewUser />} />
           <Route path="/newstation" element={<NewStation />} />
          <Route path="/newtrip" element={<NewTrip />} />
          <Route path="/newride" element={<NewRide />} />
          <Route path="/trips" element={<TripsList />} />

          <Route path="/reviews" element={<FeedbacksList />} />
          <Route path="/messages" element={<MessagesList />} />
          <Route path="/newmessage" element={<NewMessage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
    </Router>
  );
}

export default App;
