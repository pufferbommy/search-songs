import { forwardRef } from 'react'

import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({placeholder, icon, ...props}, ref) => {
    return (
      <div className={styles.inputWrapper}>
        <input ref={ref} className={styles.input} placeholder={placeholder} {...props} />
        {icon && icon}
      </div>
    )
  }
)

export default Input