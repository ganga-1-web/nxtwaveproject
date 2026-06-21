const Footer = () => (
  <div
    style={{
      backgroundColor: 'white',
      borderTop: '1px solid lightgray',
      padding: '25px 60px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '40px',
    }}
  >
    <h3
      style={{
        color: 'slateblue',
        margin: 0,
      }}
    >
      Go Business
    </h3>
    <div
      style={{
        display: 'flex',
        gap: '30px',
        color: 'gray',
      }}
    >
      <span>About</span>
      <span>Contact</span>
      <span>Privacy</span>
      <span>Terms</span>
    </div>
    <p
      style={{
        margin: 0,
        color: 'gray',
      }}
    >
      © 2024 Go Business, Inc.
    </p>
  </div>
)
export default Footer