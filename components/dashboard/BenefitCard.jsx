import Image from 'next/image'
import React from 'react'

const BenefitCard = () => {

  const styles = {
    status: 'rounded-md p-1 text-sm text-white ',
    pending: 'bg-yellow-900 ', 
    done: ' bg-gray-700', 
    cancelled: ' bg-red-900', 
  };

  return (
    <div className='bg-slate-800 p-5 rounded-lg'>
      <h2 className='mb-5 font-extralight text-slate-300'>Latest Transactions</h2>
      <table className='w-full'>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={`user flex gap-4 items-center`}>
                <Image src="/avatar.png" alt='' width={40} height={40} className={`userImage rounded-full`} />Juan Perez
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>Pending</span>
            </td>
            <td>18.03.2024</td>
            <td>$3.200</td>
          </tr>

          <tr>
            <td>
              <div className={`user flex gap-4 items-center`}>
                <Image src="/avatar.png" alt='' width={40} height={40} className={`userImage rounded-full`} />Juan Perez
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Done</span>
            </td>
            <td>18.03.2024</td>
            <td>$3.200</td>
          </tr>

          <tr>
            <td>
              <div className={`user flex gap-4 items-center`}>
                <Image src="/avatar.png" alt='' width={40} height={40} className={`userImage rounded-full`} />Juan Perez
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>Cancelled</span>
            </td>
            <td>18.03.2024</td>
            <td>$3.200</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default BenefitCard