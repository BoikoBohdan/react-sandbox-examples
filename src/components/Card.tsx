import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

const Card = ({ children, className = '', title }: CardProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-6 bg-gray-50 min-h-[400px] rounded-xl shadow-lg ${className}`}>
      {title && (
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card; 