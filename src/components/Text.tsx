import { ReactNode } from 'react';

export interface TextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

export function Text({ size = 'xs', children, className }: TextProps) {

  return (
    <p 
      className={'text-gray-100 text-' + size + " " + className}
    >
      {children}
    </p>
  )
}