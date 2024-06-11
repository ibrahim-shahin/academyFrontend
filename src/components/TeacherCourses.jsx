import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LINK from '../link'

// components
import TeacherCourseDetails from './TeacherCourseDetails'
import CourseForm from './CourseForm'

const TeacherCourses = () => {
  const [courses, setCourses] = useState(null)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const teacher = JSON.parse(localStorage.getItem('teacher'))

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let response = await axios.get(`${LINK}/api/teacher/courses`, {
          headers: { 'Authorization': `Bearer ${teacher.token}` },
        });
        setCourses(response.data)
      } catch (error) {
        //localStorage.removeItem('teacher')

        // dispatch logout action
        //navigate('/')
        //window.location.reload(false);
      }
    }
    if (teacher) {
      fetchCourses()
    }
  }, [show])

  return (
    <>
      <div className="courses-grid">
        {
          courses && courses.map((course) => (
            <TeacherCourseDetails course={course} setShow={setShow} show={show} key={course._id} />
          ))
        }
        {
          (courses && Object.keys(courses).length === 0) && <span> <strong>No courses found :(</strong></span>
        }
      </div>
      <CourseForm setShow={setShow} show={show} />
    </>
  )
}

export default TeacherCourses