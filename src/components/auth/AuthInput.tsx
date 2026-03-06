'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

export interface AuthInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  id: string
  label: string
  required?: boolean
  error?: string
  icon: React.ReactNode
  inputClassName?: string
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ id, label, required, error, icon, inputClassName = '', ...props }, ref) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-white/95 text-sm font-medium">
        {label}
        {required && <span className="text-red-300 mr-0.5" aria-hidden>*</span>}
      </label>
      <div
        className={`
          flex items-center gap-2.5 w-full rounded-lg border bg-white/5 px-3 h-11
          transition-colors focus-within:ring-2 focus-within:ring-white/30 focus-within:border-white/60
          ${error ? 'border-red-400/80' : 'border-white/40'}
        `}
      >
        <span className="text-white/80 shrink-0 [&>svg]:size-[18px]">{icon}</span>
        <input
          ref={ref}
          id={id}
          className={`
            w-full min-w-0 bg-transparent text-white placeholder:text-white/50
            text-[15px] outline-none
            ${props.dir === 'ltr' ? 'text-right' : ''}
            ${inputClassName}
          `}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-red-300 text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  )
)

AuthInput.displayName = 'AuthInput'

export default AuthInput
