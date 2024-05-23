import AuthForm from '@/components/AuthForm'
import { getLoggedInUser } from '@/lib/actions/user.action';
import React from 'react'

const SignUpPage = async () => {
  const loggedUser = await getLoggedInUser();
  console.log(loggedUser);
  
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type='sign-up' />
    </section>
  )
}

export default SignUpPage
