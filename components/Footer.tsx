'use client'
import { logOutAccount } from '@/lib/actions/user.action'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter()
  const handleLogOut = async () => {
    await logOutAccount()
  }
  return (
    <footer className='footer'>
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className='text-xl font-bold text-gray-700'>{user.name[0]}</p>
      </div>
      <div
        className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}
      >
        <h1 className='text-14 truncate font-semibold text-gray-700'>
          {user.name}
        </h1>
        <p className='text-14 truncate text-gray-600 font-normal'>
          {user.email}
        </p>
      </div>
      <div>
        <Image
          src={'/icons/logout.svg'}
          width={25}
          height={25}
          alt='logo'
          onClick={handleLogOut}
        />
      </div>
    </footer>
  )
}

export default Footer
