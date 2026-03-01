// App configuration constants
export const APP_CONFIG = {
  AR_MARKER_TYPE: (import.meta.env.VITE_AR_MARKER_TYPE as string) || 'hiro',
  MODEL_BUCKET_NAME: (import.meta.env.VITE_MODEL_BUCKET_NAME as string) || 'ar-models',
  LOG_LEVEL: (import.meta.env.VITE_LOG_LEVEL as string) || 'warn',
  ENABLE_ANALYTICS: (import.meta.env.VITE_ENABLE_ANALYTICS as string) === 'true',
};

// AR.js configuration
export const ARJS_CONFIG = {
  MARKER_PATTERNS: {
    hiro: '/markers/hiro.patt',
    kanji: '/markers/kanji.patt',
  },
  MARKER_SIZE: 1, // Size in scene units
  CAMERA_PARAMS_URL: '/camera_params.dat',
};

// Cache configuration
export const CACHE_CONFIG = {
  DB_NAME: 'arModelsCache',
  STORE_NAME: 'models',
  SIZE_LIMIT: 50 * 1024 * 1024, // 50MB
  MODEL_LOAD_TIMEOUT: 10000, // 10 seconds
};

// Error messages
export const ERROR_MESSAGES = {
  NO_WEBGL: 'Your browser does not support WebGL, which is required for AR.',
  NO_CAMERA: 'No camera detected on your device.',
  CAMERA_PERMISSION_DENIED: 'Camera permission was denied. Click to retry.',
  AR_NOT_SUPPORTED: 'AR is not supported on your device. Showing menu in 2D.',
  MODEL_LOAD_FAILED: 'Failed to load 3D model. It may have timed out.',
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  RESTAURANT_NOT_FOUND: 'Restaurant not found.',
  MENU_LOAD_FAILED: 'Failed to load menu data.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  CAMERA_PERMISSION_GRANTED: 'Camera access granted. Starting AR...',
  MODEL_LOADED: '3D model loaded successfully',
  MENU_LOADED: 'Menu loaded',
};

// Mock data for testing (fallback when database is empty)
export const MOCK_RESTAURANT = {
  id: 'mock-restaurant-1',
  slug: 'demo-restaurant',
  name: 'The AR Kitchen',
  description: 'Welcome to our innovative AR-enabled restaurant menu experience! Browse our curated selection of dishes with 3D models and detailed descriptions.',
  cuisine_type: 'Fusion',
  location: '123 Main Street, Demo City',
  phone: '+1 (555) 123-4567',
  website: 'https://example.com',
  ar_marker_type: 'hiro' as const,
  banner_image_url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=300&fit=crop',
  logo_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const MOCK_MENU_DATA = [
  {
    id: 'appetizer-1',
    restaurant_id: 'mock-restaurant-1',
    category_id: 'cat-1',
    name: 'Crispy Calamari',
    description: 'Golden-fried calamari rings served with marinara sauce and lemon wedges',
    price: 12.99,
    image_url: 'https://images.unsplash.com/photo-1599599810964-9bb7a7a5c932?w=300&h=200&fit=crop',
    model_id: null,
    is_available: true,
    dietary_tags: 'Contains Seafood',
    allergens: 'Seafood, Gluten',
    prep_time_minutes: 10,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'appetizer-2',
    restaurant_id: 'mock-restaurant-1',
    category_id: 'cat-1',
    name: 'Garlic Bread',
    description: 'Toasted bread brushed with garlic butter and fresh herbs',
    price: 6.99,
    image_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=200&fit=crop',
    model_id: null,
    is_available: true,
    dietary_tags: 'Vegetarian',
    allergens: 'Wheat, Dairy',
    prep_time_minutes: 5,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'main-1',
    restaurant_id: 'mock-restaurant-1',
    category_id: 'cat-2',
    name: 'Grilled Ribeye Steak',
    description: 'Premium 12oz ribeye steak, perfectly grilled and seasoned, served with roasted vegetables and mashed potatoes',
    price: 34.99,
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop',
    model_id: null,
    is_available: true,
    dietary_tags: 'Gluten-Free',
    allergens: 'None',
    prep_time_minutes: 20,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'main-2',
    restaurant_id: 'mock-restaurant-1',
    category_id: 'cat-2',
    name: 'Wild Mushroom Risotto',
    description: 'Creamy Arborio rice with mixed wild mushrooms, truffle oil, and Parmesan cheese',
    price: 22.99,
    image_url: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b5?w=300&h=200&fit=crop',
    model_id: null,
    is_available: true,
    dietary_tags: 'Vegetarian, Gluten-Free',
    allergens: 'Dairy',
    prep_time_minutes: 18,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'dessert-1',
    restaurant_id: 'mock-restaurant-1',
    category_id: 'cat-3',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
    price: 10.99,
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=200&fit=crop',
    model_id: null,
    is_available: true,
    dietary_tags: 'Vegetarian',
    allergens: 'Eggs, Dairy, Wheat',
    prep_time_minutes: 8,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'dessert-2',
    restaurant_id: 'mock-restaurant-1',
    category_id: 'cat-3',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with layers of mascarpone cream and espresso-soaked ladyfingers',
    price: 9.99,
    image_url: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=300&h=200&fit=crop',
    model_id: null,
    is_available: true,
    dietary_tags: 'Vegetarian',
    allergens: 'Eggs, Dairy, Wheat',
    prep_time_minutes: 0,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const MOCK_CATEGORIES = [
  {
    id: 'cat-1',
    restaurant_id: 'mock-restaurant-1',
    name: 'Appetizers',
    display_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 'cat-2',
    restaurant_id: 'mock-restaurant-1',
    name: 'Main Courses',
    display_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: 'cat-3',
    restaurant_id: 'mock-restaurant-1',
    name: 'Desserts',
    display_order: 3,
    created_at: new Date().toISOString(),
  },
];

// Default values
export const DEFAULTS = {
  RESTAURANT_SLUG: 'default',
  MODEL_SCALE: 1.0,
  PAGE_TITLE: 'AR Restaurant Menu',
};
