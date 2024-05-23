import Image from 'next/image'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='flex min-h-screen w-full justify-between font-inter'>
      {children}
      <div className='auth-asset'>
        <div>
          <Image
            src='/icons/auth-image.svg'
            width={1000}
            height={1000}
            alt='auth-image'
            className=' h-[500px] lg:h-[650px] w-[500px] lg:w-[650px]  '
          />
        </div>
      </div>
    </main>
  )
}
