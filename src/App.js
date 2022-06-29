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
import React from 'react'
import Jobs from './Pages/Jobs';
import FAQs from './Pages/FAQs';
import { ls } from "./Components/Encryption"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      userId: ""
    }
  }
  componentDidMount() {
    const user = ls.get("IDNumber")
    this.setState({ userId: user })
  }
  render() {
    return (
      <div>
        {this.state.userId ? <Toolbar /> : <HomeToolbar />}
        <Routes>
          <Route path="/prep-tracker/login" element={<Login />} />
          <Route path="/prep-tracker/signup" element={<SignUp />} />
          <Route path="/prep-tracker/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/prep-tracker/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/prep-tracker/preparation" element={<PrivateRoute><Preparation /></PrivateRoute>} />
          <Route path="/prep-tracker/competition" element={<PrivateRoute><Competition /></PrivateRoute>} />
          <Route path="/prep-tracker/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
          <Route path="/prep-tracker/faqs" element={<PrivateRoute><FAQs /></PrivateRoute>} />
          <Route path="/prep-tracker" exact element={<UserHome />} />
        </Routes>
      </div>
    )
  }
}

export default App;