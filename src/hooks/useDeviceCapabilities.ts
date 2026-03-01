import { useEffect, useState } from 'react';
import type { DeviceCapabilities } from '../types';

export const useDeviceCapabilities = () => {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities | null>(null);

  useEffect(() => {
    const checkCapabilities = async () => {
      try {
        // Check WebGL
        const canvas = document.createElement('canvas');
        const webgl = !!(canvas.getContext('webgl') || canvas.getContext('webgl2'));

        // Check camera
        let hasCamera = false;
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          const devices = await navigator.mediaDevices.enumerateDevices();
          hasCamera = devices.some(device => device.kind === 'videoinput');
        }

        // Check HTTPS
        const isHTTPS = window.location.protocol === 'https:';

        // Check WebXR (for future use)
        const supportsWebXR = 'xr' in navigator;

        const caps: DeviceCapabilities = {
          hasCamera,
          hasWebGL: webgl,
          supportsARJS: webgl, // AR.js requires WebGL
          supportsWebXR,
          isHTTPS,
          userAgent: navigator.userAgent,
        };

        setCapabilities(caps);
      } catch (err) {
        console.error('Failed to check device capabilities:', err);
        setCapabilities({
          hasCamera: false,
          hasWebGL: false,
          supportsARJS: false,
          supportsWebXR: false,
          isHTTPS: window.location.protocol === 'https:',
          userAgent: navigator.userAgent,
        });
      }
    };

    checkCapabilities();
  }, []);

  return capabilities;
};
