import { useState } from "react"
import ax from 'axios'
import LINK from "../link"

const teacher = JSON.parse(localStorage.getItem('teacher'))

const courseForm = ({show,setShow}) => {
  
  const [name, setName] = useState('')
  const [discreption, setDiscreption] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const course = {name, discreption}
  
      await ax.post(`${LINK}/api/course/` , course, { headers: {
        'Authorization': `Bearer ${teacher.token}`
      }})
     
      setName('')
      setDiscreption('')
      setError(null)
      setShow(!show)
     
    } catch (error) {
      setError(error.response.data.error)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New course</h3>

      <label>course name:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label>discreption:</label>
      <input 
        type="text"
        onChange={(e) => setDiscreption(e.target.value)}
        value={discreption}
      />

      <button>Add course</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default courseForm