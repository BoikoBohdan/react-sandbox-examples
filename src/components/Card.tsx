import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

const Card = ({ children, className = '', title }: CardProps) => {
  return (
    <div className={`h-full flex flex-col p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold mb-6 text-gray-900 text-center">{title}</h2>
      )}
      <div className="flex-1 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

export default Card; 