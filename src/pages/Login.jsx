import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LINK from "../link"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const [isTeacher, setIsTeacher] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError(null)
      if (isTeacher) {
        const response = await axios.post(`${LINK}/api/teacher/login`, { email, password })
        // save the teacher's data to local storage
        localStorage.setItem('teacher', JSON.stringify(response.data))
      }
      else {
        const response = await axios.post(`${LINK}/api/student/login`, { email, password })
        // save the student's data to local storage
        console.log(response.data)
        localStorage.setItem('studnet', JSON.stringify(response.data))
      }

      navigate('/')
      window.location.reload(false);

    } catch (error) {
      setError(error.response.data.error)
    }

  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email address:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <div className="role-selection">
        <label htmlFor="role" className="role-label">I am a:</label>
        <div className="radio-group">
          <input
            type="radio"
            id="student"
            name="role"
            value="student"
            checked={!isTeacher}
            onChange={(e) => setIsTeacher(false)}
          />
          <label htmlFor="student" className="radio-label">Student</label>

          <input
            className="inline"
            type="radio"
            id="teacher"
            name="role"
            value="teacher"
            checked={isTeacher}
            onChange={(e) => setIsTeacher(true)}
          />
          <label htmlFor="teacher" className="radio-label">Teacher</label>
        </div>
      </div>

      <button className="login-button">Log in</button>
      {error && <div className="error">{error}</div>}

    </form>

  )
}

export default Login