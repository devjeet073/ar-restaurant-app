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
      {/* Menu Cards List - Bottom Right */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        maxWidth: '280px',
        maxHeight: isExpanded ? '70vh' : '300px',
        overflow: 'auto',
        pointerEvents: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        {isLoading ? (
          <LoadingSpinner size="sm" text="Loading menu..." />
        ) : items.length > 0 ? (
          <>
            {items.slice(0, isExpanded ? undefined : 3).map(item => (
              <MenuCard
                key={item.id}
                item={item}
                isSelected={item.id === selectedItemId}
                onSelect={() => handleSelectItem(item)}
              />
            ))}
            {!isExpanded && items.length > 3 && (
              <button
                onClick={() => setIsExpanded(true)}
                style={{
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                View All ({items.length})
              </button>
            )}
            {isExpanded && items.length > 3 && (
              <button
                onClick={() => setIsExpanded(false)}
                style={{
                  backgroundColor: '#f0f0f0',
                  color: '#333',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
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

      {/* Selected Item Details - Bottom Left */}
      {selectedItem && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          maxWidth: '280px',
          pointerEvents: 'auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          <h3 style={{
            margin: '0 0 10px 0',
            fontSize: '16px',
            color: '#333',
          }}>
            {selectedItem.name}
          </h3>

          <p style={{
            margin: '0 0 10px 0',
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.4',
          }}>
            {selectedItem.description}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#667eea',
            }}>
              ${selectedItem.price?.toFixed(2)}
            </span>

            {selectedItem.prep_time_minutes && (
              <span style={{
                fontSize: '12px',
                color: '#999',
              }}>
                ⏱ {selectedItem.prep_time_minutes} min
              </span>
            )}
          </div>

          {selectedItem.dietary_tags && (
            <div style={{
              marginTop: '10px',
              fontSize: '12px',
              color: '#999',
              paddingTop: '10px',
              borderTop: '1px solid #eee',
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
