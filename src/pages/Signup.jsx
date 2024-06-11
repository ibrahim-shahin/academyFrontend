import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LINK from "../link"

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isTeacher, setIsTeacher] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError(null)
      if (isTeacher) {
        //send the name, email and passowrd to server
        const response = await axios.post(`${LINK}/api/teacher/signup`, { name, email, password })
        // save the user to local storage
        localStorage.setItem('teacher', JSON.stringify(response.data))
      }
      else {
        //send the name, email and passowrd to server
        const response = await axios.post(`${LINK}/api/student/signup`, { name, email, password })
        // save the user to local storage
        localStorage.setItem('student', JSON.stringify(response.data))
      }
      // update the auth context
      navigate('/')
      window.location.reload(false);
      // dispatch({type: 'LOGIN', payload: json})

      // update loading state

    } catch (error) {
      console.log(error)
      setError(error.response.data.error)
    }

  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
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

      <button className="login-button">Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup