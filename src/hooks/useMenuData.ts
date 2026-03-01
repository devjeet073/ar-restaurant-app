import { useEffect, useState } from 'react';
import type { MenuItem, Category } from '../types';
import { supabase, handleSupabaseError, isSupabaseConfigured } from '../services/supabase';
import { MOCK_MENU_DATA, MOCK_CATEGORIES } from '../utils/constants';


export const useMenuData = (restaurantId: string | null) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!restaurantId) {
      setItems([]);
      setCategories([]);
      return;
    }

    const loadMenu = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Check if using mock restaurant data (mock-restaurant-1 is the mock ID)
        if (restaurantId === 'mock-restaurant-1') {
          console.info('🟡 USING MOCK MENU DATA: Mock restaurant detected');
          console.info('📊 Menu Items:', MOCK_MENU_DATA.length, 'items');
          console.info('📂 Categories:', MOCK_CATEGORIES.length, 'categories');
          setItems(MOCK_MENU_DATA as MenuItem[]);
          setCategories(MOCK_CATEGORIES as Category[]);
          return;
        }

        // Check if Supabase not configured
        if (!isSupabaseConfigured()) {
          console.info('🟡 USING MOCK DATA: Supabase not configured');
          console.info('📊 Menu Items:', MOCK_MENU_DATA.length, 'items');
          console.info('📂 Categories:', MOCK_CATEGORIES.length, 'categories');
          setItems(MOCK_MENU_DATA as MenuItem[]);
          setCategories(MOCK_CATEGORIES as Category[]);
          return;
        }

        console.info('🔵 Fetching from Supabase for restaurant_id:', restaurantId);

        // Fetch menu items
        const { data: itemsData, error: itemsErr } = await supabase
          .from('menu_items')
          .select('*')
          .eq('restaurant_id', restaurantId)
          .eq('is_available', true)
          .order('display_order', { ascending: true });

        if (itemsErr) {
          console.error('❌ Menu items fetch error:', itemsErr);
          throw itemsErr;
        }

        console.info('✅ Menu items fetched:', itemsData?.length || 0, 'items');

        // Fetch categories
        const { data: categoriesData, error: categoriesErr } = await supabase
          .from('categories')
          .select('*')
          .eq('restaurant_id', restaurantId)
          .order('display_order', { ascending: true });

        if (categoriesErr) {
          console.error('❌ Categories fetch error:', categoriesErr);
          throw categoriesErr;
        }

        console.info('✅ Categories fetched:', categoriesData?.length || 0, 'categories');

        const items = (itemsData || []) as MenuItem[];
        const categories = (categoriesData || []) as Category[];

        // If no items found, use mock data
        if (items.length === 0) {
          console.warn('⚠️ No menu items in database, falling back to mock data');
          console.info('📊 Mock Menu Items:', MOCK_MENU_DATA.length, 'items');
          console.info('📂 Mock Categories:', MOCK_CATEGORIES.length, 'categories');
          setItems(MOCK_MENU_DATA as MenuItem[]);
          setCategories(MOCK_CATEGORIES as Category[]);
        } else {
          console.info('🟢 Successfully loaded from database');
          console.info('📋 Database items:', items);
          console.info('📋 Database categories:', categories);
          setItems(items);
          setCategories(categories);
        }
      } catch (err: any) {
        console.error('❌ Error loading menu:', err?.message);
        
        // Fallback to mock data on error
        if (!isSupabaseConfigured()) {
          console.info('🟡 FALLBACK: Using mock menu data (Supabase not configured)');
          setItems(MOCK_MENU_DATA as MenuItem[]);
          setCategories(MOCK_CATEGORIES as Category[]);
        } else {
          const errorMessage = handleSupabaseError(err);
          setError(errorMessage);
          console.error('❌ Failed to load menu:', errorMessage);
          // Still show mock data to user as fallback
          console.info('🟡 FALLBACK: Using mock data as error recovery');
          setItems(MOCK_MENU_DATA as MenuItem[]);
          setCategories(MOCK_CATEGORIES as Category[]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadMenu();
  }, [restaurantId]);

  return { items, categories, isLoading, error };
};
