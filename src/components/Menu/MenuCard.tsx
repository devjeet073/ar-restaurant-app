import React from 'react';
import type { MenuCardProps } from '../../types';

export const MenuCard: React.FC<MenuCardProps> = ({
  item,
  isSelected = false,
  onSelect,
}) => {
  return (
    <div
      onClick={onSelect}
      style={{
        backgroundColor: isSelected ? '#667eea' : 'white',
        color: isSelected ? 'white' : '#333',
        border: isSelected ? '2px solid #667eea' : '1px solid #ddd',
        borderRadius: '8px',
        padding: 'clamp(10px, 2.5vw, 12px)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isSelected ? '0 4px 12px rgba(102, 126, 234, 0.4)' : '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{
        fontSize: 'clamp(12px, 2.5vw, 14px)',
        fontWeight: '600',
        marginBottom: '4px',
        lineHeight: 1.2,
      }}>
        {item.name}
      </div>

      {item.price && (
        <div style={{
          fontSize: 'clamp(12px, 2.5vw, 14px)',
          fontWeight: '700',
          color: isSelected ? '#FFD700' : '#667eea',
          marginBottom: '6px',
        }}>
          ${item.price.toFixed(2)}
        </div>
      )}

      {item.description && (
        <div style={{
          fontSize: 'clamp(11px, 2vw, 12px)',
          opacity: 0.8,
          lineHeight: '1.3',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {item.description}
        </div>
      )}

      {item.dietary_tags && (
        <div style={{
          fontSize: 'clamp(10px, 1.8vw, 11px)',
          marginTop: '4px',
          opacity: 0.7,
          lineHeight: 1.2,
        }}>
          {item.dietary_tags}
        </div>
      )}
    </div>
  );
};

export default MenuCard;
