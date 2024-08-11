import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SildeNavBar from './../Layouts/NavBar';

import { Landing } from '../Pages/LandingPage/Landing';
import { Admin } from '../Pages/AdminPage/Admin';
import SignIn from '../Pages/SignInPage/SignIn';
import SignUp from '../Pages/SignUpPage/SignUp';


function App() {

  return (
    <div>
      {/* NavBar contains the main routes  */}
  <SildeNavBar />

    <Router>
      <Routes>
        <Route path="*" element={<Landing />} />
        <Route path="/home" element={< Landing/>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </div>
 
  )
}

export default App
