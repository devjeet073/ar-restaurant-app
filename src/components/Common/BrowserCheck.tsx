import React from 'react';
import { useDeviceCapabilities } from '../../hooks/useDeviceCapabilities';
import { ERROR_MESSAGES } from '../../utils/constants';

interface BrowserCheckProps {
  children: React.ReactNode;
}

export const BrowserCheck: React.FC<BrowserCheckProps> = ({ children }) => {
  const capabilities = useDeviceCapabilities();

  if (!capabilities) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Checking device capabilities...</p>
      </div>
    );
  }

  if (!capabilities.hasWebGL) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#d32f2f' }}>
        <h2>Browser Not Supported</h2>
        <p>{ERROR_MESSAGES.NO_WEBGL}</p>
        <p>Please use a modern browser like Chrome, Firefox, or Safari.</p>
      </div>
    );
  }

  if (!capabilities.hasCamera) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#d32f2f' }}>
        <h2>Camera Not Available</h2>
        <p>{ERROR_MESSAGES.NO_CAMERA}</p>
      </div>
    );
  }

  if (!capabilities.isHTTPS && !window.location.hostname.includes('localhost')) {
    console.warn('Not using HTTPS - camera may not work');
  }

  return <>{children}</>;
};

export default BrowserCheck;
