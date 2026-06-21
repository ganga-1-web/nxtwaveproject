import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const onLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }
  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0px 1px 5px lightgray',
      }}
    >
      <h2
        style={{
          color: 'slateblue',
          margin: 0,
        }}
      >
        Go Business
      </h2>

      <div
        style={{
          display: 'flex',
          gap: '15px',
        }}
      >
        <button
          style={{
            backgroundColor: 'slateblue',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Try for free
        </button>
        <button
          onClick={onLogout}
          style={{
            backgroundColor: 'white',
            color: 'firebrick',
            border: '1px solid lightgray',
            padding: '10px 20px',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Log out
        </button>
      </div>
    </div>
  )
}
export default Navbar