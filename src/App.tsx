import React, { useState, useEffect } from 'react';
import BrowserCheck from './components/Common/BrowserCheck';
import Landing from './components/Landing/Landing';
import ARViewer from './components/AR/ARViewer';
import { RestaurantProvider, useRestaurant } from './contexts/RestaurantContext';
import { MenuProvider } from './contexts/MenuContext';
import { ARProvider } from './contexts/ARContext';
import { useMenuData } from './hooks/useMenuData';
import LoadingSpinner from './components/Common/LoadingSpinner';
import './App.css';

/**
 * Inner app component that uses context providers
 */
const AppContent: React.FC = () => {
  // State
  const [restaurantSlug, setRestaurantSlug] = useState<string | null>(null);
  const [page, setPage] = useState<'landing' | 'ar' | 'fallback'>('landing');

  // Hooks
  const { restaurant, isLoading: isLoadingRestaurant } = useRestaurant();
  const menuData = useMenuData(restaurant?.id || null);

  // Parse URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('restaurant');
    if (slug) {
      setRestaurantSlug(slug);
    } else if (import.meta.env.DEV) {
      // In dev mode, default to demo slug for convenience
      setRestaurantSlug('demo-restaurant');
    }
  }, []);

  const handleCameraPermitted = () => {
    setPage('ar');
  };

  const handleViewMenuWithout = () => {
    setPage('fallback');
  };

  // Show loading while checking restaurants
  if (isLoadingRestaurant && restaurantSlug) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // Landing page
  if (page === 'landing') {
    return (
      <Landing
        restaurantSlug={restaurantSlug}
        onCameraPermitted={handleCameraPermitted}
        onViewMenuWithout={handleViewMenuWithout}
      />
    );
  }

  // AR Viewer
  if (page === 'ar' && restaurant) {
    return (
      <ARViewer
        restaurant={restaurant}
        menuItems={menuData.items}
        isLoading={menuData.isLoading}
        error={menuData.error}
      />
    );
  }

  // Fallback 2D menu
  if (page === 'fallback' && restaurant) {
    return (
      <div style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}>
        {/* Header */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto 30px',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: '28px',
            marginBottom: '10px',
          }}>
            {restaurant.name}
          </h1>
          {restaurant.description && (
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: 0,
            }}>
              {restaurant.description}
            </p>
          )}
        </div>

        {/* Menu Items Grid */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {menuData.items.map(item => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginBottom: '12px',
                  }}
                />
              )}

              <h3 style={{
                margin: '0 0 8px',
                fontSize: '18px',
                color: '#333',
              }}>
                {item.name}
              </h3>

              {item.description && (
                <p style={{
                  margin: '0 0 12px',
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.4',
                }}>
                  {item.description}
                </p>
              )}

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
                  ${item.price?.toFixed(2)}
                </span>

                {item.prep_time_minutes && (
                  <span style={{
                    fontSize: '12px',
                    color: '#999',
                  }}>
                    ⏱ {item.prep_time_minutes} min
                  </span>
                )}
              </div>

              {(item.dietary_tags || item.allergens) && (
                <div style={{
                  marginTop: '12px',
                  paddingTop: '12px',
                  borderTop: '1px solid #eee',
                  fontSize: '12px',
                  color: '#999',
                }}>
                  {item.dietary_tags && <div>{item.dietary_tags}</div>}
                  {item.allergens && <div>⚠️ {item.allergens}</div>}
                </div>
              )}
            </div>
          ))}
        </div>

        {menuData.items.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#666',
          }}>
            <p>No menu items available</p>
          </div>
        )}

        {/* Back to Menu Button */}
        <div style={{
          maxWidth: '1200px',
          margin: '40px auto 0',
          textAlign: 'center',
        }}>
          <button
            onClick={() => setPage('landing')}
            style={{
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  // Fallback if no restaurant found
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div>
        <h1>No Restaurant Found</h1>
        <p>Please check the URL and try again.</p>
      </div>
    </div>
  );
};

/**
 * Root App with all providers
 */
function App() {
  return (
    <BrowserCheck>
      <RestaurantProvider>
        <MenuProvider>
          <ARProvider>
            <AppContent />
          </ARProvider>
        </MenuProvider>
      </RestaurantProvider>
    </BrowserCheck>
  );
}

export default App;
