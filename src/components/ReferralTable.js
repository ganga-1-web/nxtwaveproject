import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
const ReferralTable = props => {
  const {referrals} = props
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const filteredData = referrals
    .filter(
      each =>
        each.name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        each.serviceName
          .toLowerCase()
          .includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return new Date(a.date) - new Date(b.date)
      }
      return new Date(b.date) - new Date(a.date)
    })
  const itemsPerPage = 10
  const lastIndex = currentPage * itemsPerPage
  const firstIndex = lastIndex - itemsPerPage
  const currentData = filteredData.slice(
    firstIndex,
    lastIndex
  )
  const totalPages = Math.ceil(
    filteredData.length / itemsPerPage
  )
  const openReferral = id => {
    navigate(`/referral/${id}`)
  }
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '18px',
        padding: '30px',
        marginTop: '40px',
        boxShadow:
          '0px 4px 12px rgba(0,0,0,0.06)',
      }}
    >
      <h2
        style={{
          color: 'black',
          marginBottom: '25px',
        }}
      >
        All Referrals
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '25px',
        }}
      >
        <input
          type="text"
          placeholder="Name or service..."
          value={searchText}
          onChange={e =>
            setSearchText(e.target.value)
          }
          style={{
            width: '280px',
            padding: '12px',
            border: '1px solid lightgray',
            borderRadius: '10px',
            outline: 'none',
          }}
        />
        <select
          value={sortOrder}
          onChange={e =>
            setSortOrder(e.target.value)
          }
          style={{
            padding: '12px',
            border: '1px solid lightgray',
            borderRadius: '10px',
          }}
        >
          <option value="desc">
            Newest First
          </option>
          <option value="asc">
            Oldest First
          </option>
        </select>
      </div>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: 'whitesmoke',
              color: 'gray',
              textTransform: 'uppercase',
              fontSize: '14px',
            }}
          >
            <th
              style={{
                padding: '18px',
                textAlign: 'left',
              }}
            >
              Name
            </th>
            <th
              style={{
                padding: '18px',
                textAlign: 'left',
              }}
            >
              Service
            </th>

            <th
              style={{
                padding: '18px',
                textAlign: 'left',
              }}
            >
              Date
            </th>

            <th
              style={{
                padding: '18px',
                textAlign: 'left',
              }}
            >
              Profit
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((each, index) => (
            <tr
              key={each.id}
              onClick={() =>
                openReferral(each.id)
              }
              style={{
                cursor: 'pointer',
                backgroundColor:
                  index % 2 === 0
                    ? 'white'
                    : 'whitesmoke',
              }}
            >
              <td
                style={{
                  padding: '20px',
                }}
              >
                {each.name}
              </td>

              <td
                style={{
                  padding: '20px',
                }}
              >
                {each.serviceName}
              </td>

              <td
                style={{
                  padding: '20px',
                }}
              >
                {each.date.replaceAll('-', '/')}
              </td>

              <td
                style={{
                  padding: '20px',
                  color: 'slateblue',
                  fontWeight: 'bold',
                }}
              >
                $
                {Number(
                  each.profit
                ).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '25px',
        }}
      >
        <p
          style={{
            color: 'gray',
          }}
        >
          Showing {firstIndex + 1}–
          {Math.min(
            lastIndex,
            filteredData.length
          )}{' '}
          of {filteredData.length} entries
        </p>
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(currentPage - 1)
            }
            style={{
              padding: '10px 15px',
              marginRight: '8px',
              borderRadius: '8px',
              border: '1px solid white',
            }}
          >
            Previous
          </button>

          {[...Array(totalPages)].map(
            (_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                style={{
                  padding: '10px 15px',
                  marginRight: '5px',
                  borderRadius: '8px',
                  border: '1px solid white',
                  backgroundColor:
                    currentPage ===
                    index + 1
                      ? 'slateblue'
                      : 'white',
                  color:
                    currentPage ===
                    index + 1
                      ? 'white'
                      : '#000',
                }}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(currentPage + 1)
            }
            style={{
              padding: '10px 15px',
              borderRadius: '8px',
              border: '1px solid lightgray',
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
export default ReferralTable