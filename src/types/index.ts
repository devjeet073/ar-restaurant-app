// Core business entities
export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  description?: string;
  cuisine_type?: string;
  location?: string;
  phone?: string;
  website?: string;
  ar_marker_type: 'hiro' | 'kanji' | 'custom';
  banner_image_url?: string;
  logo_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  restaurant_id: string;
  name: string;
  display_order: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  restaurant_id: string;
  category_id?: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  model_id?: string;
  is_available: boolean;
  dietary_tags?: string;
  allergens?: string;
  prep_time_minutes?: number;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// 3D Model metadata
export interface Model3D {
  id: string;
  restaurant_id: string;
  name: string;
  description?: string;
  file_path: string; // storage path: models/glb/restaurant_id/model_name.glb
  file_size_bytes?: number;
  scale_factor: number;
  position_offset?: Vector3Like;
  rotation_offset?: Vector3Like;
  uses_draco_compression: boolean;
  texture_urls?: string[];
  metadata?: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Vector 3D coordinates
export interface Vector3Like {
  x: number;
  y: number;
  z: number;
}

// AR Session state
export interface ARSession {
  id: string;
  type: 'arjs' | 'webxr';
  markerDetected: boolean;
  markerEntity?: any;
  scene?: any;
  renderer?: any;
  camera?: any;
}

// Context types
export interface RestaurantContextType {
  restaurant: Restaurant | null;
  isLoading: boolean;
  error: string | null;
  loadRestaurant: (slug: string) => Promise<void>;
}

export interface MenuContextType {
  items: MenuItem[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  loadMenu: (restaurantId: string) => Promise<void>;
  filterByCategory: (categoryId?: string) => MenuItem[];
}

export interface ARContextType {
  isARSupported: boolean;
  isARJSSupported: boolean;
  arSession: ARSession | null;
  markerDetected: boolean;
  error: string | null;
  loadedModel: any;
}

// API Response types
export interface SupabaseError {
  message: string;
  code: string;
}

// Analytics event
export interface AnalyticsEvent {
  id: string;
  restaurant_id?: string;
  event_type: 'model_loaded' | 'menu_viewed' | 'model_interaction' | 'permission_requested';
  menu_item_id?: string;
  device_ua?: string;
  session_id?: string;
  timestamp: string;
}

// Component props
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export interface MenuCardProps {
  item: MenuItem;
  isSelected?: boolean;
  onSelect?: () => void;
}

export interface ModelViewerProps {
  modelUrl: string;
  scale?: number;
  position?: Vector3Like;
  rotation?: Vector3Like;
  onLoaded?: () => void;
  onError?: (error: Error) => void;
}

// Utility types
export type PermissionState = 'prompt' | 'granted' | 'denied';

export interface DeviceCapabilities {
  hasCamera: boolean;
  hasWebGL: boolean;
  supportsARJS: boolean;
  supportsWebXR: boolean;
  isHTTPS: boolean;
  userAgent: string;
}

export interface CacheMetadata {
  model_id: string;
  cached_at: number;
  size_bytes: number;
}
