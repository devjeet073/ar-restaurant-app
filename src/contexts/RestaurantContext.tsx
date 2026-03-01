import React, { createContext, useCallback, useState } from 'react';
import type { Restaurant, RestaurantContextType } from '../types';
import { supabase, handleSupabaseError, isSupabaseConfigured } from '../services/supabase';
import { MOCK_RESTAURANT } from '../utils/constants';


export const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRestaurant = useCallback(async (slug: string) => {
    if (!slug) {
      setError('Restaurant slug is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check if using mock data for demo/testing
      if (slug === 'demo-restaurant' || slug === 'demo-hotel') {
        console.info('🟡 Loading mock restaurant data for demo slug:', slug);
        console.info('🏪 Restaurant:', MOCK_RESTAURANT.name);
        setRestaurant(MOCK_RESTAURANT as Restaurant);
        return;
      }

      // Try to connect to Supabase if configured
      if (!isSupabaseConfigured()) {
        console.warn('🟡 Supabase not configured. Using mock data.');
        console.info('🏪 Restaurant:', MOCK_RESTAURANT.name);
        setRestaurant(MOCK_RESTAURANT as Restaurant);
        return;
      }

      console.info('🔵 Fetching restaurant from Supabase with slug:', slug);

      const { data, error: err } = await supabase
        .from('restaurants')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (err) {
        throw err;
      }

      if (data) {
        console.info('✅ Restaurant found in database:', data.name);
        console.info('📋 Restaurant data:', data);
        setRestaurant(data as Restaurant);
      } else {
        console.warn('⚠️ No restaurant found for slug:', slug);
        setError(`Restaurant "${slug}" not found`);
      }
    } catch (err: any) {
      console.error('❌ Database query failed:', err?.message);
      console.error('Error code:', err?.code);
      
      // Fallback to mock data on error
      if (err?.code === 'PGRST116' || !isSupabaseConfigured()) {
        console.info('🟡 FALLBACK: Using mock restaurant data');
        console.info('🏪 Restaurant:', MOCK_RESTAURANT.name);
        setRestaurant(MOCK_RESTAURANT as Restaurant);
      } else {
        const errorMessage = handleSupabaseError(err);
        setError(errorMessage);
        console.error('❌ Failed to load restaurant:', errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: RestaurantContextType = {
    restaurant,
    isLoading,
    error,
    loadRestaurant,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = React.useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within RestaurantProvider');
  }
  return context;
};
