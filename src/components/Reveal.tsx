import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useReveal } from '../hooks';

type Props = {
  as?: ElementType;
  index?: number;
  className?: string;
  id?: string;
  children: ReactNode;
};

export function Reveal({ as: Tag = 'div', index = 0, className = '', id, children }: Props) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`.trim()} style={{ '--i': index } as CSSProperties}>
      {children}
    </Tag>
  );
}
