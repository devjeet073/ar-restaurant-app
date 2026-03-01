import React, { createContext, useCallback, useState } from 'react';
import type { MenuItem, Category, MenuContextType } from '../types';
import { supabase, handleSupabaseError } from '../services/supabase';

export const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMenu = useCallback(async (restaurantId: string) => {
    if (!restaurantId) {
      setError('Restaurant ID is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Load menu items
      const { data: itemsData, error: itemsErr } = await supabase
        .from('menu_items')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .eq('is_available', true)
        .order('display_order', { ascending: true });

      if (itemsErr) {
        throw itemsErr;
      }

      // Load categories
      const { data: categoriesData, error: categoriesErr } = await supabase
        .from('categories')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .order('display_order', { ascending: true });

      if (categoriesErr) {
        throw categoriesErr;
      }

      setItems((itemsData || []) as MenuItem[]);
      setCategories((categoriesData || []) as Category[]);
    } catch (err) {
      const errorMessage = handleSupabaseError(err);
      setError(errorMessage);
      console.error('Failed to load menu:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filterByCategory = useCallback((categoryId?: string): MenuItem[] => {
    if (!categoryId) {
      return items;
    }
    return items.filter(item => item.category_id === categoryId);
  }, [items]);

  const value: MenuContextType = {
    items,
    categories,
    isLoading,
    error,
    loadMenu,
    filterByCategory,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within MenuProvider');
  }
  return context;
};
