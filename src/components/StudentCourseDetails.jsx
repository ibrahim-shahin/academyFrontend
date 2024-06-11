import axios from 'axios'
import { useState } from 'react'
import LINK from '../link'

const student = JSON.parse(localStorage.getItem('student'))

const TeacherCourseDetails = ({ course, show, setShow }) => {
    const [error, setError] = useState(null)

    const handleWithdraw = async () => {
        try {
            if (!student) {
                throw new Error('Only students can withdraw')
            }

            await axios.delete(`${LINK}/api/student/course/${course._id}`, {
                headers: {
                    'Authorization': `Bearer ${student.token}`
                }
            });

            setError(null)
            setShow(!show)

        } catch (error) {
            setError(error.response.data.error)
        }
    }

    return (
        <>
            <div className="course-card">
                <h4>{course.name}</h4>
                <p><strong>discreption: </strong>{course.discreption}</p>
                <p><strong>teacher: </strong>{course.teacher_name}</p>
                <button className="withdraw" onClick={handleWithdraw}>Withdraw</button>
            </div>
        </>
    )
}

export default TeacherCourseDetails