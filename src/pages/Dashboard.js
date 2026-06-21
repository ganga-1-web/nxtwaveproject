import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ReferralTable from '../components/ReferralTable'

import {
  FaDollarSign,
  FaCreditCard,
  FaLink,
  FaHourglassHalf,
  FaPercentage,
  FaCoins,
  FaUsers,
  FaExchangeAlt,
} from 'react-icons/fa'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    getDashboardData()
  }, [])

  const getDashboardData = async () => {
    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await fetch(
        'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals',
        options,
      )

      const data = await response.json()

      if (response.ok) {
        setDashboardData(data.data || data)
      } else {
        setErrorMsg('Unable to fetch data')
      }
    } catch (error) {
      setErrorMsg('Something went wrong')
    }

    setLoading(false)
  }

  const copyText = text => {
    navigator.clipboard.writeText(text)
    alert('Copied Successfully')
  }

  const getIcon = index => {
    const icons = [
      <FaDollarSign />,
      <FaCreditCard />,
      <FaLink />,
      <FaHourglassHalf />,
      <FaPercentage />,
      <FaCoins />,
      <FaUsers />,
      <FaExchangeAlt />,
    ]

    return icons[index % icons.length]
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (errorMsg !== '') {
    return <h1>{errorMsg}</h1>
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          backgroundColor: '#f5f7fb',
          minHeight: '100vh',
          padding: '40px',
        }}
      >
        <div
          style={{
            maxWidth: '1300px',
            margin: 'auto',
          }}
        >
          <h1
            style={{
              fontSize: '48px',
              fontWeight: '700',
              marginBottom: '10px',
            }}
          >
            Referral Dashboard
          </h1>

          <p
            style={{
              color: '#6b7280',
              fontSize: '18px',
              marginBottom: '40px',
            }}
          >
            Track your referrals, earnings, and partner activity in one place.
          </p>

          <h2 style={{marginBottom: '20px'}}>Overview</h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            {dashboardData?.metrics?.map((each, index) => (
              <div
                key={each.id}
                style={{
                  backgroundColor: '#fff',
                  border: '1px solid #eee',
                  borderRadius: '12px',
                  padding: '20px',
                  width: '260px',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#6c5ce7',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#fff',
                    fontSize: '22px',
                    marginBottom: '15px',
                  }}
                >
                  {getIcon(index)}
                </div>

                <h2>{each.value}</h2>

                <p style={{color: '#777'}}>{each.label}</p>
              </div>
            ))}
          </div>

          <h2 style={{marginBottom: '20px'}}>Service Summary</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: '20px',
              backgroundColor: '#fff',
              padding: '25px',
              borderRadius: '12px',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                border: '1px solid #eee',
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <p style={{color: '#888'}}>SERVICE</p>
              <h3>{dashboardData?.serviceSummary?.service}</h3>
            </div>

            <div
              style={{
                border: '1px solid #eee',
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <p style={{color: '#888'}}>YOUR REFERRALS</p>
              <h3>{dashboardData?.serviceSummary?.yourReferrals}</h3>
            </div>

            <div
              style={{
                border: '1px solid #eee',
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <p style={{color: '#888'}}>ACTIVE REFERRALS</p>
              <h3>{dashboardData?.serviceSummary?.activeReferrals}</h3>
            </div>

            <div
              style={{
                border: '1px solid #eee',
                padding: '20px',
                borderRadius: '10px',
              }}
            >
              <p style={{color: '#888'}}>TOTAL REF. EARNINGS</p>
              <h3>{dashboardData?.serviceSummary?.totalRefEarnings}</h3>
            </div>
          </div>

          <h2 style={{marginBottom: '20px'}}>
            Refer Friends and Earn More
          </h2>

          <div
            style={{
              backgroundColor: '#fff',
              padding: '25px',
              borderRadius: '12px',
              marginBottom: '30px',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '20px',
              }}
            >
              <div style={{flex: 1}}>
                <p style={{color: '#888'}}>
                  YOUR REFERRAL LINK
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  <input
                    type="text"
                    value={dashboardData?.referral?.link || ''}
                    readOnly
                    style={{
                      flex: 1,
                      padding: '12px',
                    }}
                  />

                  <button
  style={{
    backgroundColor: '#0f9d8a',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    cursor: 'pointer',
    fontWeight: '600',
  }}
  onClick={() =>
    copyText(dashboardData?.referral?.link)
  }
>
  Copy
</button>
                </div>
              </div>

              <div style={{flex: 1}}>
                <p style={{color: '#888'}}>
                  YOUR REFERRAL CODE
                </p>

                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  <input
                    type="text"
                    value={dashboardData?.referral?.code || ''}
                    readOnly
                    style={{
  flex: 1,
  padding: '12px',
  border: '1px solid #263243',
  borderRadius: '8px',
  backgroundColor: '#f8fafc',
}}
                  />

                  <button
                    onClick={() =>
                      copyText(
                        dashboardData?.referral?.code,
                      )
                    }
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ReferralTable
            referrals={dashboardData?.referrals || []}
          />
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Dashboard