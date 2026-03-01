import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Check .env file.');
  console.warn('VITE_SUPABASE_URL:', supabaseUrl ? 'set' : 'missing');
  console.warn('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'set' : 'missing');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Helper function for error handling
export const handleSupabaseError = (error: any): string => {
  if (!error) return 'Unknown error occurred';

  if (typeof error === 'string') return error;
  if (error.message) return error.message;
  if (error.msg) return error.msg;

  return 'An error occurred while connecting to the database';
};

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = (): boolean => {

  console.info('Checking Supabase configuration...');
  return !!(supabaseUrl && supabaseAnonKey &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseAnonKey.includes('placeholder'));
};
