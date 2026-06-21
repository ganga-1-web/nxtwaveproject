import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'

const Ref = () => {
  const {id} = useParams()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getReferralDetails = async () => {
      const token = Cookies.get('jwt_token')

      try {
        const response = await fetch(
          'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const result = await response.json()

        if (response.ok) {
          const referrals =
            result?.data?.referrals ||
            result?.referrals ||
            []

          const selectedReferral = referrals.find(
            each => String(each.id) === String(id)
          )

          setData(selectedReferral)
        }
      } catch (error) {
        console.log(error)
      }

      setLoading(false)
    }

    getReferralDetails()
  }, [id])

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (!data) {
    return <h1>Referral Not Found</h1>
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          backgroundColor: '#f5f7fb',
          minHeight: '100vh',
          padding: '60px',
        }}
      >
        <div
          style={{
            maxWidth: '1300px',
            margin: '0 auto',
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: '#6c5ce7',
              fontWeight: '600',
              fontSize: '18px',
            }}
          >
            ← Back to dashboard
          </Link>

          <h1
            style={{
              marginTop: '25px',
              fontSize: '38px',
              color: '#111827',
              marginBottom: '10px',
            }}
          >
            Referral Details
          </h1>

          <p
            style={{
              color: '#6b7280',
              fontSize: '15px',
              marginBottom: '40px',
            }}
          >
            Full information for this referral partner.
          </p>

          <div
            style={{
              backgroundColor: '#ffffffe2',
              borderRadius: '20px',
              padding: '40px',
              width: '700px',
              boxShadow:
                '0px 4px 15px rgba(0,0,0,0.08)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2
                style={{
                  fontSize: '35px',
                  margin: 0,
                  color: '#111827',
                }}
              >
                {data.name}
              </h2>

              <span
                style={{
                  backgroundColor: '#eef0ff',
                  color: '#0e0555',
                  padding: '12px 22px',
                  borderRadius: '14px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                {data.serviceName}
              </span>
            </div>

            <hr
              style={{
                marginTop: '30px',
                marginBottom: '30px',
                border: 'none',
                borderTop: '1px solid #e5e7eb',
              }}
            />

            <div
              style={{
                display: 'grid',
                rowGap: '25px',
              }}
            >
              <div>
                <strong>REFERRAL ID:</strong> {data.id}
              </div>

              <div>
                <strong>NAME:</strong> {data.name}
              </div>

              <div>
                <strong>SERVICE NAME:</strong> {data.serviceName}
              </div>

              <div>
                <strong>DATE:</strong>{' '}
                {data.date?.replaceAll('-', '/')}
              </div>

              <div>
                <strong>PROFIT:</strong> $
                {Number(data.profit).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Ref