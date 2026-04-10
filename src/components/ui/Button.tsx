import { type ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  external?: boolean
}

const sizeClasses = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-base', lg: 'px-8 py-4 text-lg' }
const variantClasses = {
  primary: 'bg-brand-orange text-white hover:bg-brand-orange-dark focus:ring-brand-orange',
  secondary: 'bg-brand-navy text-white hover:bg-brand-navy-light focus:ring-brand-navy',
  outline: 'border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white focus:ring-brand-orange',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', size = 'md', href, external, children, className = '', ...props }, ref) => {
  const classes = `inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`
  if (href) {
    return external ? <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a> : <Link href={href} className={classes}>{children}</Link>
  }
  return <button ref={ref} className={classes} {...props}>{children}</button>
})
Button.displayName = 'Button'
export default Button
