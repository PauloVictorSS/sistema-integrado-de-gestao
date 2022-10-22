import { ReactNode } from 'react';

export interface TextProps {
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

export function Text({ size = 'md', children, className }: TextProps) {

  return (
    <p 
      className={'text-gray-100 font-sans' + size + className}
    >
      {children}
    </p>
  )
}