import * as React from 'react'

interface InputProps {
  placeholder: string
  value: string
  className?: string
  onChange?: (value: string) => void
}

const input = (props: InputProps) => {
  return (
    <div className={`inputWrapper ${props.className || ''}`}>
      <input 
        type="text" 
        placeholder={props.placeholder} 
        // tslint:disable-next-line:jsx-no-lambda
        onChange={(event) => props.onChange && props.onChange(event.target.value)}
        value={props.value}
      />
    </div>
  )
}

export default input