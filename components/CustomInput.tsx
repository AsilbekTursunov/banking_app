import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { string, z } from 'zod'
import { Control, FieldPath, useForm } from 'react-hook-form'
import { authFormSchema } from '@/lib/utils'
const formScheme = authFormSchema('sign-up')
interface CustomInputProps {
  control: Control<z.infer<typeof formScheme>>
  name: FieldPath<z.infer<typeof formScheme>>
  label: string
  placeholder: string
  type: string
}
const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  type,
}: CustomInputProps) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <div className='form-item'>
              <FormLabel className='form-label'>{label}</FormLabel>
              <div className='flex w-full flex-col'>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    className='input-class'
                    {...field}
                    type={type}
                  />
                </FormControl>
                <FormMessage className='form-message mt-4' />
              </div>
            </div>
          </>
        )}
      />
    </>
  )
}

export default CustomInput
