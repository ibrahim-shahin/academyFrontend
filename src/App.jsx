import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Courses from './pages/Courses'
import MyCourses from './pages/MyCourses'

function App() {

  const teacher = JSON.parse(localStorage.getItem('teacher'))
  const student = JSON.parse(localStorage.getItem('student'))

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/courses"
              element={(teacher || student) ? <Courses /> : <Navigate to="/login" />}
            />
            <Route
              path="/myCourses"
              element={(teacher || student) ? <MyCourses /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={(!teacher && !student) ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={(!teacher && !student) ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
