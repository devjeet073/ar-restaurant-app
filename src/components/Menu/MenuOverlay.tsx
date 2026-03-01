import React, { useState } from 'react';
import type { MenuItem } from '../../types';
import MenuCard from './MenuCard';
import LoadingSpinner from '../Common/LoadingSpinner';

interface MenuOverlayProps {
  items: MenuItem[];
  isLoading?: boolean;
  onItemSelected?: (item: MenuItem) => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
  items,
  isLoading = false,
  onItemSelected,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileView = windowWidth < 768;

  const selectedItem = items.find(item => item.id === selectedItemId);

  const handleSelectItem = (item: MenuItem) => {
    setSelectedItemId(item.id);
    if (onItemSelected) {
      onItemSelected(item);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      pointerEvents: 'none',
      zIndex: 100,
    }}>
      {/* Menu Cards List - Responsive positioning */}
      <div style={{
        position: 'absolute',
        ...(isMobileView
          ? {
              bottom: '10px',
              left: '10px',
              right: '10px',
              maxWidth: 'none',
              width: 'calc(100% - 20px)',
              maxHeight: isExpanded ? '60vh' : 'auto',
            }
          : {
              bottom: '20px',
              right: '20px',
              maxWidth: '280px',
              maxHeight: isExpanded ? '70vh' : '300px',
            }),
        overflow: 'auto',
        pointerEvents: 'auto',
        display: 'flex',
        flexDirection: isMobileView ? 'row' : 'column',
        gap: '10px',
        flexWrap: isMobileView ? 'wrap' : 'nowrap',
      }}>
        {isLoading ? (
          <LoadingSpinner size="sm" text="Loading menu..." />
        ) : items.length > 0 ? (
          <>
            {items.slice(0, isExpanded ? undefined : (isMobileView ? 4 : 3)).map(item => (
              <div
                key={item.id}
                style={{
                  flex: isMobileView ? '0 1 calc(50% - 5px)' : 'none',
                  minWidth: isMobileView ? 'calc(50% - 5px)' : 'auto',
                }}
              >
                <MenuCard
                  item={item}
                  isSelected={item.id === selectedItemId}
                  onSelect={() => handleSelectItem(item)}
                />
              </div>
            ))}
            {!isExpanded && items.length > (isMobileView ? 4 : 3) && (
              <button
                onClick={() => setIsExpanded(true)}
                style={{
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: 'clamp(8px, 2vw, 10px)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: 'clamp(12px, 2vw, 14px)',
                  fontWeight: '600',
                  flex: isMobileView ? '0 1 calc(50% - 5px)' : 'none',
                }}
              >
                View All ({items.length})
              </button>
            )}
            {isExpanded && items.length > (isMobileView ? 4 : 3) && (
              <button
                onClick={() => setIsExpanded(false)}
                style={{
                  backgroundColor: '#f0f0f0',
                  color: '#333',
                  border: 'none',
                  padding: 'clamp(8px, 2vw, 10px)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: 'clamp(12px, 2vw, 14px)',
                  flex: isMobileView ? '0 1 calc(50% - 5px)' : 'none',
                }}
              >
                Collapse
              </button>
            )}
          </>
        ) : (
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#666',
          }}>
            No menu items available
          </div>
        )}
      </div>

      {/* Selected Item Details - Responsive */}
      {selectedItem && (
        <div style={{
          position: 'absolute',
          ...(isMobileView
            ? {
                top: '10px',
                left: '10px',
                right: '10px',
                maxWidth: 'none',
                width: 'calc(100% - 20px)',
              }
            : {
                bottom: '20px',
                left: '20px',
                maxWidth: '280px',
              }),
          pointerEvents: 'auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: 'clamp(12px, 3vw, 16px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          maxHeight: isMobileView ? '120px' : 'auto',
          overflow: 'auto',
        }}>
          <h3 style={{
            margin: '0 0 8px 0',
            fontSize: 'clamp(14px, 3vw, 16px)',
            color: '#333',
            fontWeight: '600',
          }}>
            {selectedItem.name}
          </h3>

          <p style={{
            margin: '0 0 8px 0',
            fontSize: 'clamp(12px, 2.5vw, 14px)',
            color: '#666',
            lineHeight: '1.3',
            display: isMobileView ? '-webkit-box' : 'block',
            WebkitLineClamp: isMobileView ? 2 : 'unset',
            WebkitBoxOrient: 'vertical',
            overflow: isMobileView ? 'hidden' : 'visible',
          }}>
            {selectedItem.description}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{
              fontSize: 'clamp(14px, 3vw, 18px)',
              fontWeight: '700',
              color: '#667eea',
            }}>
              ${selectedItem.price?.toFixed(2)}
            </span>

            {selectedItem.prep_time_minutes && (
              <span style={{
                fontSize: 'clamp(10px, 2vw, 12px)',
                color: '#999',
                whiteSpace: 'nowrap',
              }}>
                ⏱ {selectedItem.prep_time_minutes} min
              </span>
            )}
          </div>

          {selectedItem.dietary_tags && (
            <div style={{
              marginTop: '8px',
              fontSize: 'clamp(10px, 2vw, 12px)',
              color: '#999',
              paddingTop: '8px',
              borderTop: '1px solid #eee',
              display: isMobileView ? '-webkit-box' : 'block',
              WebkitLineClamp: isMobileView ? 1 : 'unset',
              WebkitBoxOrient: 'vertical',
              overflow: isMobileView ? 'hidden' : 'visible',
            }}>
              {selectedItem.dietary_tags}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuOverlay;
