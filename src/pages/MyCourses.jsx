import { Navigate } from 'react-router-dom'

// pages & components
import TeacherCourses from '../components/TeacherCourses'
import StudentCourses from '../components/StudentCourses'

const teacher = JSON.parse(localStorage.getItem('teacher'))
const student = JSON.parse(localStorage.getItem('student'))

const MyCourses = () => {
  
  return (
    <>
    {
      (teacher || student) ? teacher ? <TeacherCourses /> :  <StudentCourses /> : <Navigate to="/login" />
    }
    </>
  )
}

export default MyCourses