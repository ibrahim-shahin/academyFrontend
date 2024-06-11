import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LINK from '../link'
import GeneralCourseDetails from "../components/GeneralCourseDetails"

const teacher = JSON.parse(localStorage.getItem('teacher'))
const student = JSON.parse(localStorage.getItem('student'))

const Courses = () => {
    const [courses, setCourses] = useState(null)
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                console.log(student)
                let response = await axios.get(`${LINK}/api/course`, {
                    headers: { 'Authorization': `Bearer ${teacher ? teacher.token : student && student.token}` },
                  });
                  console.log(response.data)
                setCourses(response.data)

            } catch (error) {
                // localStorage.removeItem('teacher')
                // localStorage.removeItem('student')

                // dispatch logout action
                //navigate('/')
                //window.location.reload(false);
            }
        }
        if (teacher || student)
            fetchCourses()
    }, [show])

    return (
        <>
            {(teacher || student) &&
                <div className="courses-grid">
                    {
                  courses && courses.map((course) => (
                    <GeneralCourseDetails course={course} setShow={setShow} show={show} key={course._id} />
                  ))
                }
                {
                  (courses && Object.keys(courses).length === 0) && <span> <strong>No courses found :(</strong></span>
                }
                </div>
            }
        </>
    )
}

export default Courses