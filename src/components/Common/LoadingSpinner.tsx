import React from 'react';
import type { LoadingSpinnerProps } from '../../types';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', text }) => {
  const sizeMap = {
    sm: '30px',
    md: '50px',
    lg: '70px',
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      padding: '20px',
    }}>
      <div style={{
        width: sizeMap[size],
        height: sizeMap[size],
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #2196F3',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
      {text && <p style={{ fontSize: '14px', color: '#666' }}>{text}</p>}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
