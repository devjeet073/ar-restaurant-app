import React, { useEffect } from 'react';
import { useRestaurant } from '../../contexts/RestaurantContext';
import { useCamera } from '../../hooks/useCamera';
import PermissionRequest from './PermissionRequest';
import LoadingSpinner from '../Common/LoadingSpinner';

interface LandingProps {
  restaurantSlug: string | null;
  onCameraPermitted: () => void;
  onViewMenuWithout: () => void;
}

export const Landing: React.FC<LandingProps> = ({
  restaurantSlug,
  onCameraPermitted,
  onViewMenuWithout,
}) => {
  const { restaurant, isLoading: isLoadingRestaurant, loadRestaurant } = useRestaurant();
  const { isRequesting } = useCamera();

  // Load restaurant data when slug changes
  useEffect(() => {
    if (restaurantSlug) {
      loadRestaurant(restaurantSlug);
    }
  }, [restaurantSlug, loadRestaurant]);

  if (isLoadingRestaurant) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
        <LoadingSpinner size="lg" text="Loading restaurant..." />
      </div>
    );
  }

  if (!restaurant && restaurantSlug) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
      }}>
        <h1>Restaurant Not Found</h1>
        <p>No restaurant with slug "{restaurantSlug}" found.</p>
        <p>Please check the URL and try again.</p>
      </div>
    );
  }

  return (
    <PermissionRequest
      onPermissionGranted={onCameraPermitted}
      onPermissionDenied={onViewMenuWithout}
      isLoading={isRequesting}
      error={null}
    />
  );
};

export default Landing;
