import { useEffect, useState } from 'react';

export const useRestaurantParams = () => {
  const [restaurantSlug, setRestaurantSlug] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('restaurant');
    setRestaurantSlug(slug);
  }, []);

  return { restaurantSlug };
};
