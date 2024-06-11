import axios from 'axios'
import { useState } from 'react'
import LINK from '../link'

const student = JSON.parse(localStorage.getItem('student'))

const GeneralCourseDetails = ({ course, show, setShow }) => {
  const [error, setError] = useState(null)

  const handleEnroll = async () => {
    try {
      if (!student) {
        throw new Error('Only students can enroll')
      }
      console.log(student)
      let response = await axios.get(`${LINK}/api/student/course/${course._id}`, {
        headers: {
          'Authorization': `Bearer ${student.token}`
        }
      });
      console.log(response.data)
      setShow(!show)
    } catch (error) {
      setError(error.message)
    }

  }

  return (
    <>
      <div className="course-card">
        <h4>{course.name}</h4>
        <p><strong>discreption: </strong>{course.discreption}</p>
        <p><strong>teacher: </strong>{course.teacher_name}</p>
        <button className="enroll" onClick={handleEnroll}>Enroll</button>
        { error && <div className='error'>{error}</div>}
      </div>
    </>
  )
}

export default GeneralCourseDetails