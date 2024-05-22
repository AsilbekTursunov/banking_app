'use client'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname()
  return (
    <section className='sidebar'>
      <nav className='flex flex-col gap-4'>
        <Link
          href={'/'}
          className='mb-12 flex cursor-pointer items-center gap-2'
        >
          <Image
            src={'/icons/logo.svg'}
            width={34}
            height={34}
            alt={'logo'}
            className='size-[24px] max-xl:size-14'
          />
          <h1 className='sidebar-logo'>Horizon</h1>
        </Link>
        {sidebarLinks.map(item => {
          const isActive =
            item.route === pathname || pathname.startsWith(`${item.route}`)
          return (
            <Link
              href={item.route}
              key={item.label}
              className={`flex cursor-pointer items-center gap-2 sidebar-link 
              ${isActive ? 'bg-bank-gradient text-white' : ' '}`}
            >
              <Image
                src={item.imgURL}
                width={24}
                height={24}
                alt={item.label}
                className={` ${isActive ? 'brightness-[3] invert-0' : ' '} `}
              />
              <p className={`sidebar-label ${isActive ? '!text-white' : ''}`}>
                {item.label}
              </p>
            </Link>
          )
        })}
        USER
      </nav>
      Footer
    </section>
  )
}

export default Sidebar
