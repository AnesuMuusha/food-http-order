import React, { Ref, ForwardRefRenderFunction } from 'react';
import './Input.css';

interface InputProps {
  input: React.InputHTMLAttributes<HTMLInputElement>;
  label: string;
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ input, label }, ref: Ref<HTMLInputElement>) => {
  return (
    <div className='input'>
      <label htmlFor={input.id}>{label}</label>
      <input ref={ref} {...input} />
    </div>
  );
};

export default React.forwardRef(Input);