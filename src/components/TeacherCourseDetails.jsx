import axios from 'axios'
import { useState } from 'react'
import LINK from '../link'

const teacher = JSON.parse(localStorage.getItem('teacher'))

const TeacherCourseDetails = ({ course, show, setShow }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState(course?.name)
  const [discreption, setDiscription] = useState(course?.discreption)
  const [error, setError] = useState(null)

  const handleUpdate = async () => {
    if (!teacher) {
      return
    }
    try {
      const updatedCourse = { name, discreption }

      console.log(updatedCourse)

      await axios.patch(`${LINK}/api/course/${course._id}`, updatedCourse, {
        headers: {
          'Authorization': `Bearer ${teacher.token}`
        }
      })

      setError(null)
      setShow(!show)
      setIsOpen(false)

    } catch (error) {
      setError(error.response.data.error)
    }
  }

  const handleDelete = async () => {
    if (!teacher) {
      return
    }
    await axios.delete(`${LINK}/api/course/${course._id}`, {
      headers: {
        'Authorization': `Bearer ${teacher.token}`
      }
    })

    setShow(!show)
  }

  return (
    <>
      <div className="course-card">
        <h4>{course.name}</h4>
        <p><strong>discreption: </strong>{course.discreption}</p>
        <button className="" onClick={() => setIsOpen(true)}>Update</button>
        <button className="" onClick={handleDelete}>delete</button>
      </div>

      <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', width: "30%", transform: 'translate(-50%, -50%)', zIndex: "1", padding: '20px', backgroundColor: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
        <div className="create">
          <h3>Update course</h3>

          <label>Excersize name:</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />

          <label>discreption:</label>
          <input
            type="text"
            onChange={(e) => setDiscription(e.target.value)}
            value={discreption}
          />

          <button onClick={handleUpdate}>Update course</button>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </>
  )
}

export default TeacherCourseDetails