import {Link} from 'react-router-dom'

const NotFound = () => (
  <div
    style={{
      backgroundColor: '#f5f7fb',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <h1
      style={{
        fontSize: '70px',
        color: '#111827',
        marginBottom: '10px',
      }}
    >
      404
    </h1>

    <p
      style={{
        fontSize: '24px',
        color: '#4b5563',
        marginBottom: '20px',
      }}
    >
      Page not found
    </p>

    <Link
      to="/"
      style={{
        textDecoration: 'none',
        color: '#6c5ce7',
        fontWeight: 'bold',
        fontSize: '18px',
      }}
    >
      Back to dashboard
    </Link>
  </div>
)

export default NotFound