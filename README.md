# Web AR Restaurant Menu Application

<!-- https://silly-salamander-548b11.netlify.app/?restaurant=demo-restaurant -->

A production-ready, mobile-first Web AR application for displaying restaurant menus using augmented reality. Built with React + Three.js + AR.js, deployable on Netlify with Supabase backend.

## ✨ Features

- 🎥 **Browser-based AR** - No app download required
- 📱 **Mobile-first** - Optimized for Android Chrome
- 🎯 **Marker-based AR** - Uses printable Hiro/Kanji markers
- 🔄 **Dynamic Menu** - Load data from Supabase
- 🎨 **Beautiful UI** - Modern responsive design
- ⚡ **Fast Loading** - IndexedDB model caching
- 🌐 **Fallback Mode** - 2D menu for unsupported browsers

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Supabase
Copy `.env.example` to `.env.local` and add your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set Up Database
Run the SQL schema from `SETUP_GUIDE.md` in your Supabase dashboard.

### 4. Start Development
```bash
npm run dev
```
Open `http://localhost:5173/?restaurant=demo-hotel`

### 5. Deploy
```bash
npm run build
# Push to GitHub and connect to Netlify
```

## 📖 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup, database, and deployment instructions
- **[plan file](/.claude/plans/shimmying-prancing-gizmo.md)** - Architecture and implementation details

## 🛠️ Technology Stack

### Frontend
- **Vite** - Lightning-fast build tool
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Three.js** - 3D rendering
- **@react-three/fiber** - React bindings for Three.js
- **AR.js** - Marker-based AR

### Backend
- **Supabase** - PostgreSQL + Storage
- **Row Level Security** - Automatic permission handling

### Deployment
- **Netlify** - Static hosting with auto-deployments
- **HTTPS** - Enforced by Netlify (required for camera access)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── AR/             # AR viewer & scene
│   ├── Landing/        # Permission & intro
│   ├── Menu/           # Menu display
│   └── Common/         # Shared components
├── contexts/           # Global state providers
├── hooks/              # Custom React hooks
├── services/           # Supabase client & API
├── types/              # TypeScript interfaces
├── utils/              # Constants & helpers
└── App.tsx             # Root component
```

## 🎮 User Experience

1. **Landing** → User clicks "Enable Camera"
2. **Permission** → Browser asks for camera access
3. **AR View** → Shows 3D model on marker
4. **Menu** → Floating cards show menu items
5. **Selection** → Click item to see details
6. **Fallback** → 2D menu if AR unavailable

## 🔑 Key Components

| Component | Purpose |
|-----------|---------|
| `BrowserCheck` | Detects device capabilities |
| `Landing` | Initial permission request |
| `ARViewer` | Main AR experience |
| `MenuOverlay` | Floating menu UI |
| `Three3DScene` | 3D model rendering |
| `useMenuData` | Fetch menu from Supabase |
| `useModel3D` | Load & cache 3D models |
| `useCamera` | Handle camera permissions |

## 📊 Database Schema

**Tables:**
- `restaurants` - Restaurant metadata
- `menu_items` - Individual dish information
- `models` - 3D model metadata
- `categories` - Menu categories
- `analytics_events` - Optional usage tracking

**Access:** All tables are public-readable, no authentication required

## 🌍 Deploy in 3 Steps

1. **GitHub** - Push code to your repo
2. **Netlify** - Connect your GitHub account
3. **Environment** - Add Supabase credentials in Netlify dashboard

Your site will be live at `https://your-site.netlify.app/?restaurant=demo-hotel`

## 📱 Testing

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Android Chrome
1. Print AR marker (Hiro or Kanji)
2. Open site on mobile
3. Allow camera permission
4. Point camera at marker

## 🐛 Troubleshooting

**Camera not working?**
- Check camera permissions in OS settings
- Use HTTPS (required by browsers)
- Try a different browser

**3D model won't load?**
- Verify model path in Supabase storage
- Check file size (should be <5MB)
- Check network in DevTools

**Restaurant not found?**
- Use correct slug from database
- Check URL: `?restaurant=slug-here`

## 🚧 Phase 2 Roadmap

- [ ] WebXR API support (markerless AR)
- [ ] Hand tracking
- [ ] Persistent AR (models stay in world)
- [ ] Admin dashboard
- [ ] Add-to-cart functionality
- [ ] Image optimization
- [ ] Analytics dashboard

## 💡 Tips

- **Free 3D Models:** Sketchfab.com
- **Compress Models:** Use Draco compression (70% size reduction)
- **Test Markers:** Print from AR.js GitHub repo
- **Cache Models:** Automatically via IndexedDB (50MB limit)

## 📝 License

MIT

## 🤝 Contributing

Built with ❤️ using Claude Code

---

**Ready to get started?** Follow the [SETUP_GUIDE.md](./SETUP_GUIDE.md)!
