'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2, Router } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.action'
const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const formScheme = authFormSchema(type)
  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address1: '',
      state: '',
      postalCode: '',
      dateOfBirth: '',
      ssn: '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formScheme>) => {
    setisLoading(true)

    try {
      if (type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        })

        if (response) router.push('/')
      }
      if (type === 'sign-up') {
        const newUser = await signUp(data)

        setUser(newUser)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setisLoading(false)
    }
  }

  return (
    <section className='auth-form'>
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='cursor-pointer flex items-center gap-1 px-4'>
          <Image
            src='/icons/logo.svg'
            width={34}
            height={34}
            alt='Horizon logo'
          />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
            Horizon
          </h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
          <h1 className='text-24 lg:text-26 font-semibold text-gray-900'>
            {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
            <p className='text-16 font-normal text-gray-600'>
              {user
                ? 'Link your account to get started'
                : 'Please enter your details'}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className='flex flex-col gap-4'>{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              {type == 'sign-up' && (
                <>
                  <div className='flex gap-2'>
                    <CustomInput
                      control={form.control}
                      name='firstName'
                      label='Firstname'
                      placeholder='Firstname'
                      type='text'
                    />
                    <CustomInput
                      control={form.control}
                      name='lastName'
                      label='Lastname'
                      placeholder='Lastname'
                      type='text'
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name='address1'
                    label='Address'
                    placeholder='Enter you Address'
                    type='text'
                  />
                  <CustomInput
                    control={form.control}
                    name='city'
                    label='City'
                    placeholder='Enter you City'
                    type='text'
                  />
                  <div className='flex gap-2'>
                    <CustomInput
                      control={form.control}
                      name='state'
                      label='State'
                      placeholder='ex:NY'
                      type='text'
                    />
                    <CustomInput
                      control={form.control}
                      name='postalCode'
                      label='Postal Code'
                      placeholder='ex:11101'
                      type='number'
                    />
                  </div>
                  <div className='flex gap-2'>
                    <CustomInput
                      control={form.control}
                      name='dateOfBirth'
                      label='Date of Birth'
                      placeholder='yyyy-mm-dd'
                      type='text'
                    />
                    <CustomInput
                      control={form.control}
                      name='ssn'
                      label='SSN'
                      placeholder='ex:1234'
                      type='number'
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name='email'
                label='Email'
                placeholder='Enter you email'
                type='email'
              />
              <CustomInput
                control={form.control}
                name='password'
                label='Password'
                placeholder='Enter you password'
                type='password'
              />
              <div className='flex justify-center flex-col'>
                <Button type='submit' className='form-btn' disabled={isLoading}>
                  {isLoading ? (
                    <div className='flex items-center gap-2'>
                      <Loader2 className='w-4 h-4 animate-spin' /> Loading
                    </div>
                  ) : type === 'sign-in' ? (
                    'Sign In'
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </div>
              <div className='flex justify-center items-center gap-2   '>
                <p className='max-sm:text-xs text-16 font-normal text-gray-600'>
                  {type === 'sign-in'
                    ? `Don't you have an account?`
                    : 'Already have an account?'}
                </p>
                <Link
                  href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
                  className='max-sm:text-xs form-link'
                >
                  {type === 'sign-in' ? 'Sign-Up' : 'Sign-In'}
                </Link>
              </div>
            </form>
          </Form>
        </>
      )}
    </section>
  )
}

export default AuthForm
