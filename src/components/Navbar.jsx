import { Link , useNavigate } from 'react-router-dom'

const teacher = JSON.parse(localStorage.getItem('teacher'))
const student = JSON.parse(localStorage.getItem('student'))

const Navbar = () => {
 
  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('teacher')
    localStorage.removeItem('student')

    // dispatch logout action
    navigate('/')
    window.location.reload(false); 
  }
  
  console.log(teacher, student)

  return (
    <header className="navbar">
        <Link to="/">
          <h1>Academy Portal</h1>
        </Link>
        <Link to="/myCourses">
          <h1>My Courses</h1>
        </Link>
        <Link to="/courses">
          <h1>All Courses</h1>
        </Link>
        <nav>
          {(teacher || student) && (
            <div>
              <span>{teacher ? teacher.email : student.email}</span>
              <button onClick={handleLogOut}>Log out</button>
            </div>
          )}
          {(!teacher && !student) && (
            <div>
              <Link to="/login"><button>Login</button></Link>
              <Link to="/signup"><button>Signup</button></Link>
            </div>
          )}
        </nav>
    </header>
  )
}

export default Navbar