import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LINK from '../link'

// components
import StudentCourseDetails from './StudentCourseDetails'

const student = JSON.parse(localStorage.getItem('student'))

const StudentCourses = () => {
  const [courses, setCourses] = useState(null)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let response = await axios.get(`${LINK}/api/student/courses`, {
          headers: { 'Authorization': `Bearer ${student.token}` },
        });
        setCourses(response.data)
      } catch (error) {
        //localStorage.removeItem('teacher')

        // dispatch logout action
        //navigate('/')
        //window.location.reload(false);
      }
    }
    if (student) {
      fetchCourses()
    }
  }, [show])

  return (
      <div className="courses-grid">
        {
          courses && courses.map((course) => (
            <StudentCourseDetails course={course} setShow={setShow} show={show} key={course._id} />
          ))
        }
        {
          (courses && Object.keys(courses).length === 0) && <span> <strong>No courses found :(</strong></span>
        }
      </div>
  )
}

export default StudentCourses