# 🛠️ Portfolio CMS Studio (Supabase Powered)

A dedicated, lightweight Headless Content Management System designed for **Suyash Baoney's Portfolio**.

Manage your projects, Medium articles, and career/education milestones dynamically from a browser interface without editing code or redeploying your site.

---

## ✨ Features

- **🚀 Instant Updates**: Add projects, Medium articles, or journey milestones with instant live synchronization.
- **🗄️ Supabase PostgreSQL**: Scalable, free cloud database with Row-Level Security (RLS).
- **🖼️ Asset Uploads**: Direct image uploads to Supabase Storage (`portfolio-assets` bucket).
- **🔒 Secure Admin Access**: Email/password authentication for admin CRUD permissions.
- **📱 Responsive Studio**: Dark-mode glassmorphic dashboard matching your developer portfolio theme.

---

## 🚀 Getting Started

### 1. Install & Run Locally
```bash
npm install
npm run dev
```
The studio will run at `http://localhost:5174`.

### 2. Connect Supabase
1. Create a free project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in Supabase and paste the contents of `supabase-schema.sql`. Hit **Run**.
3. Copy your **Project URL** and **anon Key** from **Project Settings → API** into your `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. Create an admin account using the **Admin Login** button in the top right.

---

## 📂 Project Structure

```
├── supabase-schema.sql       # Copy-paste SQL script to create tables, RLS & seed data
├── .env.example              # Environment variables template
├── index.html                # Vite HTML entry
├── vite.config.js            # Vite configuration (port 5174)
└── src/
    ├── supabaseClient.js     # Supabase client & credential helper
    ├── components/
    │   ├── Navbar.jsx        # Top bar with connection status & auth
    │   ├── ProjectsManager.jsx # CRUD & image upload for projects
    │   ├── BlogsManager.jsx  # CRUD for Medium articles & blogs
    │   ├── JourneyManager.jsx# Timeline & education milestone manager
    │   ├── SetupGuide.jsx    # Interactive integration guide & code snippets
    │   └── AuthModal.jsx     # Admin authentication modal
    ├── App.jsx               # Main CMS tabbed layout
    ├── index.css             # Dark modern UI styling
    └── main.jsx              # React DOM entry
```
