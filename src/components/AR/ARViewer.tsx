import React, { useState, useEffect } from 'react';
import type { MenuItem, Restaurant } from '../../types';
import Three3DScene from './Three3DScene';
import MenuOverlay from '../Menu/MenuOverlay';
import LoadingSpinner from '../Common/LoadingSpinner';

interface ARViewerProps {
  restaurant: Restaurant;
  menuItems: MenuItem[];
  isLoading?: boolean;
  error?: string | null;
}

export const ARViewer: React.FC<ARViewerProps> = ({
  restaurant,
  menuItems,
  isLoading = false,
  error = null,
}) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(
    menuItems.length > 0 ? menuItems[0] : null
  );

  useEffect(() => {
    if (menuItems.length > 0 && !selectedItem) {
      setSelectedItem(menuItems[0]);
    }
  }, [menuItems, selectedItem]);

  if (error) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#fff',
      }}>
        <div style={{
          maxWidth: '400px',
          padding: '20px',
          backgroundColor: '#ffebee',
          borderRadius: '8px',
          color: '#c62828',
        }}>
          <h2>Error Loading AR Menu</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#000',
    }}>
      {/* Camera/AR Canvas Area */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#f0f0f0',
      }}>
        {isLoading ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}>
            <LoadingSpinner size="lg" text="Loading AR viewer..." />
          </div>
        ) : (
          <Three3DScene
            menuItem={selectedItem}
          />
        )}
      </div>

      {/* Restaurant Header */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '16px',
        pointerEvents: 'none',
        zIndex: 10,
        textAlign: 'center',
      }}>
        <h1 style={{
          margin: '0 0 5px 0',
          fontSize: '20px',
        }}>
          {restaurant.name}
        </h1>
        {restaurant.description && (
          <p style={{
            margin: '0',
            fontSize: '12px',
            opacity: 0.8,
          }}>
            {restaurant.description}
          </p>
        )}
      </div>

      {/* Menu Overlay */}
      <MenuOverlay
        items={menuItems}
        isLoading={isLoading}
        onItemSelected={setSelectedItem}
      />

      {/* Marker Detection Hint */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(102, 126, 234, 0.9)',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        pointerEvents: 'none',
        zIndex: 5,
        fontSize: '14px',
      }}>
        <p style={{ margin: '0 0 10px 0' }}>📱 Point camera at AR marker</p>
        <p style={{ margin: '0', fontSize: '12px', opacity: 0.8 }}>
          (Hiro/Kanji marker)
        </p>
      </div>
    </div>
  );
};

export default ARViewer;
