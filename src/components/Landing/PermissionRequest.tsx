import React from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';

interface PermissionRequestProps {
  onPermissionGranted: () => void;
  onPermissionDenied: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const PermissionRequest: React.FC<PermissionRequestProps> = ({
  onPermissionGranted,
  onPermissionDenied,
  isLoading = false,
  error = null,
}) => {
  const handleRequestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });

      // Stop stream (we just wanted to request permission)
      stream.getTracks().forEach(track => track.stop());

      // Store permission
      localStorage.setItem('ar_camera_permission', 'granted');
      onPermissionGranted();
    } catch (err) {
      console.error('Camera permission denied:', err);
      onPermissionDenied();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    }}>
      <div style={{
        maxWidth: '400px',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '20px',
        }}>
          📷
        </div>

        <h1 style={{
          fontSize: '28px',
          marginBottom: '15px',
          color: '#333',
        }}>
          Camera Access Required
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#666',
          marginBottom: '10px',
          lineHeight: '1.5',
        }}>
          To view the AR menu, we need permission to access your camera.
        </p>

        <p style={{
          fontSize: '14px',
          color: '#999',
          marginBottom: '30px',
        }}>
          Your camera feed is only used to display AR menu items and is not recorded.
        </p>

        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            border: '1px solid #ef5350',
            color: '#c62828',
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '20px',
            fontSize: '14px',
          }}>
            {error}
          </div>
        )}

        {isLoading && (
          <LoadingSpinner size="sm" text="Requesting camera access..." />
        )}

        {!isLoading && (
          <>
            <button
              onClick={handleRequestCamera}
              style={{
                width: '100%',
                backgroundColor: '#667eea',
                color: 'white',
                border: 'none',
                padding: '16px',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '10px',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#5568d3';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#667eea';
              }}
            >
              Enable Camera
            </button>

            <button
              onClick={onPermissionDenied}
              style={{
                width: '100%',
                backgroundColor: '#f5f5f5',
                color: '#666',
                border: 'none',
                padding: '16px',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#e0e0e0';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = '#f5f5f5';
              }}
            >
              View Menu Without AR
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PermissionRequest;
