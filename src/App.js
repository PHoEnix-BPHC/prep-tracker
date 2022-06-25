import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { Route, Routes } from "react-router-dom"
import Home from './Pages/Home';
import PrivateRoute from './Components/PrivateRoute';
import HomeToolbar from './Components/HomeToolbar';
import Toolbar from './Components/Toolbar';
import Profile from './Pages/Profile';
import Competition from './Pages/Competition';
import Preparation from './Pages/Preparation';
import UserHome from './Pages/UserHome';
import React from 'react';
import { encryptStorage } from "./Components/Encryption"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      userId: ""
    }
  }
  componentDidMount() {
    const user = localStorage.getItem("IDNumber")
    this.setState({ userId: user })
  }
  render() {
    return (
      <div>
        {this.state.userId ? <Toolbar /> : <HomeToolbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/preparation" element={<PrivateRoute><Preparation /></PrivateRoute>} />
          <Route path="/competition" element={<PrivateRoute><Competition /></PrivateRoute>} />
          <Route path="/" exact element={<UserHome />} />
        </Routes>
      </div>
    )
  }
}

export default App;