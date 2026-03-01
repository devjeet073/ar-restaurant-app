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
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Responsive Header */}
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: 'clamp(12px, 3vw, 16px)',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '0 0 auto',
        zIndex: 20,
        backdropFilter: 'blur(10px)',
      }}>
        <div>
          <h1 style={{
            margin: '0 0 4px 0',
            fontSize: 'clamp(16px, 4vw, 20px)',
            fontWeight: '600',
          }}>
            {restaurant?.name}
          </h1>
          {restaurant?.description && (
            <p style={{
              margin: '0',
              fontSize: 'clamp(11px, 2.5vw, 12px)',
              opacity: 0.8,
            }}>
              {restaurant.description}
            </p>
          )}
        </div>
      </div>

      {/* Camera/AR Canvas Area */}
      <div style={{
        position: 'relative',
        flex: 1,
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
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

      {/* Menu Overlay - Responsive */}
      <MenuOverlay
        items={menuItems}
        isLoading={isLoading}
        onItemSelected={setSelectedItem}
      />
    </div>
  );
};

export default ARViewer;
