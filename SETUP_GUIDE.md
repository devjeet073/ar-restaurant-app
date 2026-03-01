# Web AR Restaurant Menu - Setup & Deployment Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables Setup

### 1. Create `.env.local` file

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_AR_MARKER_TYPE=hiro
VITE_MODEL_BUCKET_NAME=ar-models
VITE_LOG_LEVEL=warn
VITE_ENABLE_ANALYTICS=false
```

### 2. Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign up (free tier available)
2. Create a new project
3. Go to **Settings** → **API**
4. Copy:
   - `URL` → `VITE_SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`

---

## Supabase Database Setup

### Step 1: Create Tables

Go to Supabase dashboard → **SQL Editor** and run this SQL:

```sql
-- Restaurants Table
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  cuisine_type VARCHAR(100),
  location VARCHAR(255),
  phone VARCHAR(20),
  website VARCHAR(255),
  ar_marker_type VARCHAR(50) DEFAULT 'hiro',
  banner_image_url VARCHAR(500),
  logo_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3D Models Table
CREATE TABLE models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  file_path VARCHAR(500) NOT NULL,
  file_size_bytes INTEGER,
  scale_factor FLOAT DEFAULT 1.0,
  position_offset JSONB,
  rotation_offset JSONB,
  uses_draco_compression BOOLEAN DEFAULT false,
  texture_urls JSONB,
  metadata JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Menu Items Table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  image_url VARCHAR(500),
  model_id UUID REFERENCES models(id) ON DELETE SET NULL,
  is_available BOOLEAN DEFAULT true,
  dietary_tags VARCHAR(255),
  allergens VARCHAR(255),
  prep_time_minutes INTEGER,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Analytics Table (optional)
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  event_type VARCHAR(50),
  menu_item_id UUID REFERENCES menu_items(id),
  device_ua VARCHAR(255),
  session_id VARCHAR(100),
  timestamp TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_restaurants_slug ON restaurants(slug);
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_models_restaurant ON models(restaurant_id);
CREATE INDEX idx_categories_restaurant ON categories(restaurant_id);
```

### Step 2: Set Up Row Level Security (RLS)

Enable RLS on all tables:

```sql
-- Enable RLS
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE models ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "restaurants_public_read" ON restaurants
  FOR SELECT TO public
  USING (is_active = true);

CREATE POLICY "menu_items_public_read" ON menu_items
  FOR SELECT TO public
  USING (is_available = true);

CREATE POLICY "models_public_read" ON models
  FOR SELECT TO public
  USING (is_active = true);

CREATE POLICY "categories_public_read" ON categories
  FOR SELECT TO public
  USING (true);
```

### Step 3: Create Storage Bucket

1. Go to **Storage** → **Buckets**
2. Create new bucket named `ar-models`
3. Make it **Public**
4. Upload your `.glb` model files to:
   - `models/glb/{restaurant_id}/model_name.glb`
   - (Optional) `models/draco-compressed/{restaurant_id}/model_name.glb`

### Step 4: Add Sample Data

Insert a test restaurant:

```sql
-- Insert restaurant
INSERT INTO restaurants (slug, name, description, ar_marker_type, is_active)
VALUES ('demo-hotel', 'Demo Hotel', 'A wonderful restaurant with AR menu', 'hiro', true);

-- Get the restaurant ID from the insert above, then:

-- Insert category
INSERT INTO categories (restaurant_id, name, display_order)
VALUES ('uuid-from-above', 'Appetizers', 1);

-- Insert menu item (without 3D model initially)
INSERT INTO menu_items
  (restaurant_id, category_id, name, description, price, is_available, display_order)
VALUES
  ('uuid-from-above', 'category-uuid', 'Grilled Cheese', 'Classic grilled cheese sandwich', 8.99, true, 1);
```

---

## Testing Locally

### 1. Start Development Server

```bash
npm run dev
```

Open `http://localhost:5173/?restaurant=demo-hotel`

### 2. Test Features

- **Browser Support Check**: DevTools should show no errors
- **Camera Permission**: Click "Enable Camera" button
- **2D Fallback**: Click "View Menu Without AR" to see 2D version
- **Menu Display**: Should show menu items from database

### 3. Troubleshooting

- **"Restaurant not found"**: Make sure URL param matches database slug
- **"No menu items"**: Insert menu items in Supabase for the restaurant
- **Camera permission denied**: Check browser camera permissions
- **Models not loading**: Ensure models are uploaded to storage bucket

---

## Deployment to Netlify

### Step 1: Prepare Repository

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit: AR Restaurant Menu app"

# Create .gitignore (if needed)
echo "node_modules/" >> .gitignore
echo ".env.local" >> .gitignore
echo "dist/" >> .gitignore
```

### Step 2: Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up / Log in
3. Click "Add new site" → "Import an existing project"
4. Select your Git provider (GitHub/GitLab/Bitbucket)
5. Choose the repository
6. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
7. Click "Deploy site"

### Step 3: Configure Environment Variables

In Netlify Dashboard:

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Add environment variables:
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key
   VITE_AR_MARKER_TYPE = hiro
   VITE_MODEL_BUCKET_NAME = ar-models
   VITE_LOG_LEVEL = error
   VITE_ENABLE_ANALYTICS = false
   ```
3. Trigger a redeploy

### Step 4: Test Deployed Site

1. Get your Netlify URL from dashboard
2. Test on mobile: `https://your-site.netlify.app/?restaurant=demo-hotel`
3. Verify on Android Chrome with camera permissions

---

## Using the App

### URL Parameters

```
https://your-site.netlify.app/?restaurant=demo-hotel
https://your-site.netlify.app/?restaurant=other-restaurant-slug
```

### User Flow

1. **Landing Page**: User sees camera permission request
2. **Camera Grant**: Takes user to AR viewer
3. **AR View**: Shows 3D model on marker, menu cards on overlay
4. **Menu Selection**: Click cards to see details
5. **Fallback**: If AR denied, shows 2D menu grid

### Camera Permissions

- Stored in `localStorage` as `ar_camera_permission`
- User can revoke in browser settings
- App handles denial gracefully with 2D fallback

---

## 3D Model Setup

### Finding Free Models

1. [Sketchfab.com](https://sketchfab.com) - Free 3D models
2. [CGTrader Freebies](https://www.cgtrader.com/free-3d-models)
3. [TurboSquid Freebies](https://www.turbosquid.com/Search/3D-Models/free)

### Converting to GLB

1. Download model (usually in .obj, .blend, or .gltf)
2. Use Blender (free):
   - File → Import → Select your model
   - File → Export → Export as `.glb`
3. Optimize with Draco:
   ```bash
   # Install glTF-Transform
   npm install -g @gltf-transform/cli

   # Compress
   gltf-transform compress model.glb model-compressed.glb
   ```

### Upload to Supabase

1. Go to Storage → ar-models bucket
2. Create folder: `models/glb/{restaurant_id}/`
3. Upload your `.glb` file

### Link to Menu Item

In Supabase:

1. Create a model entry in `models` table with:
   - `file_path`: `models/glb/{restaurant_id}/model-name.glb`
   - `scale_factor`: Adjust as needed (default 1.0)
   - `position_offset`: `{"x": 0, "y": 0, "z": 0}`
   - `rotation_offset`: `{"x": 0, "y": 0, "z": 0}`

2. Update menu item:
   - Set `model_id` to the model's UUID

---

## AR Markers

### Download AR.js Markers

- **Hiro** (default): https://raw.githubusercontent.com/jeromeetienne/AR.js/master/data/images/hiro.png
- **Kanji**: https://raw.githubusercontent.com/jeromeetienne/AR.js/master/data/images/kanji.png

### How to Print

1. Download marker image
2. Print at A4 size (or larger)
3. Point camera at marker to trigger AR

### Using Custom Markers

For Phase 2, you can use QR codes or custom images with AR.js pattern generation.

---

## Performance Optimization

### Bundle Size

Current build sizes (gzip):
- React: ~61 kB
- Three.js: ~195 kB
- Supabase: ~45 kB
- Total: ~301 kB

### Model Caching

Models are cached in IndexedDB (50MB limit) for faster reloads.

### Next Steps

1. **Lazy Load AR.js**: Only load when needed
2. **Image Optimization**: Use Supabase image transforms
3. **Code Splitting**: Already configured in vite.config.ts
4. **Draco Compression**: Reduces model size 70%

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| "No WebGL support" | Old browser | Use Chrome/Firefox/Safari latest |
| "Camera not available" | No permissions | Check OS camera settings |
| "Model fails to load" | Wrong file path | Verify path in models table |
| "Timeout loading model" | Slow network | Check 3G/4G, optimize model size |
| "Restaurant not found" | Wrong slug | Use exact slug from database |

### Debug Mode

Set `VITE_LOG_LEVEL=debug` in `.env.local` for verbose console logs.

### Check Network

In browser DevTools → Network tab:
- Verify Supabase API calls succeed
- Check model file downloads
- Look for CORS errors

---

## Project Structure

```
ar-restaurant-menu/
├── src/
│   ├── components/       # React components
│   ├── contexts/         # Context providers
│   ├── hooks/            # Custom hooks
│   ├── services/         # Supabase & API
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Utilities & constants
│   ├── App.tsx           # Root component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── vite.config.ts        # Vite configuration
├── netlify.toml          # Netlify config
├── tsconfig.json         # TypeScript config
├── package.json          # Dependencies
└── README.md             # This file
```

---

## Phase 2: WebXR Migration

When ready to upgrade from AR.js to WebXR:

1. Create `WebXRViewer.tsx` component
2. Add plane detection for surface placement
3. Implement hand tracking
4. Add persistent AR (models stay in world)
5. Migrate to `useWebXR` hook

The current codebase is designed to support this upgrade.

---

## Support & Resources

- **AR.js Docs**: https://ar-js-org.github.io/AR.js-Docs/
- **Three.js Docs**: https://threejs.org/docs/
- **React Three Fiber**: https://docs.pmndrs.io/react-three-fiber/
- **Supabase Docs**: https://supabase.com/docs
- **Netlify Docs**: https://docs.netlify.com/

---

## License

MIT (update based on your needs)

---

## Next Steps

1. ✅ Set up Supabase database
2. ✅ Add sample restaurant and menu items
3. ✅ Upload 3D models to storage
4. ✅ Test locally
5. ✅ Deploy to Netlify
6. 📱 Test on Android Chrome
7. 🚀 Add custom branding (logo, colors)
8. 🔄 Upgrade to WebXR in Phase 2
