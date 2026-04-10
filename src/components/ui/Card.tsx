interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg'
  shadow?: boolean
  border?: boolean
}

const paddingMap = { sm: 'p-4', md: 'p-6', lg: 'p-8' }

export default function Card({ children, className = '', padding = 'md', shadow = true, border = true }: CardProps) {
  return (
    <div className={`rounded-xl bg-white ${paddingMap[padding]} ${shadow ? 'shadow-md' : ''} ${border ? 'border border-gray-100' : ''} ${className}`}>
      {children}
    </div>
  )
}
