import React from 'react';
import { ERROR_MESSAGES } from '../../utils/constants';

export const NoARSupport: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f5f5f5',
    }}>
      <div style={{
        maxWidth: '500px',
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <h1>AR Not Available</h1>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
          {ERROR_MESSAGES.AR_NOT_SUPPORTED}
        </p>

        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '4px',
          marginBottom: '30px',
          textAlign: 'left',
        }}>
          <h3>Why AR isn't working:</h3>
          <ul style={{ fontSize: '14px', color: '#666' }}>
            <li>Your browser may not support WebGL</li>
            <li>Your device may not have a camera</li>
            <li>AR.js may not be compatible with your browser</li>
          </ul>
        </div>

        <div style={{
          backgroundColor: '#e8f5e9',
          padding: '15px',
          borderRadius: '4px',
          marginBottom: '30px',
        }}>
          <h3>What to try:</h3>
          <ul style={{ fontSize: '14px', color: '#666' }}>
            <li>Use Chrome on Android</li>
            <li>Make sure your device allows camera access</li>
            <li>Try a different browser or device</li>
          </ul>
        </div>

        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default NoARSupport;
