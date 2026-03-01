import { useCallback, useEffect, useState } from 'react';
import type { PermissionState } from '../types';

export const useCamera = () => {
  const [permission, setPermission] = useState<PermissionState>('prompt');
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if permission was previously granted and stored
  useEffect(() => {
    const stored = localStorage.getItem('ar_camera_permission');
    if (stored === 'granted') {
      setPermission('granted');
    }
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    setIsRequesting(true);
    setError(null);

    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });

      // Stop the stream immediately (we just want to check permission)
      stream.getTracks().forEach(track => track.stop());

      setPermission('granted');
      localStorage.setItem('ar_camera_permission', 'granted');
      return true;
    } catch (err: any) {
      const errorMsg = err?.message || 'Camera permission was denied';
      setError(errorMsg);
      setPermission('denied');
      return false;
    } finally {
      setIsRequesting(false);
    }
  }, []);

  return {
    permission,
    isRequesting,
    error,
    requestPermission,
  };
};
