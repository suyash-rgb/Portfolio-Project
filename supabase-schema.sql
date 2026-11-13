-- ============================================================
-- SUYASH BAONEY PORTFOLIO CMS - SUPABASE SCHEMA & SEED DATA
-- Copy and paste this script directly into the Supabase SQL Editor.
-- ============================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Web Development',
    description TEXT,
    long_description TEXT,
    tags TEXT[] DEFAULT '{}',
    github_url TEXT,
    live_url TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT false,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. BLOGS / ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    excerpt TEXT,
    medium_url TEXT NOT NULL,
    thumbnail_url TEXT,
    tags TEXT[] DEFAULT '{}',
    read_time TEXT DEFAULT '5 min read',
    published_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. JOURNEY / EDUCATION & EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.journey (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year TEXT NOT NULL,
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('edu', 'work', 'training')),
    branch_name TEXT DEFAULT 'main',
    commit_hash TEXT DEFAULT 'c4a91b2',
    description TEXT,
    status TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Anyone can READ (so portfolio can display content without login).
-- Only LOGGED-IN USERS (Admin) can INSERT, UPDATE, or DELETE.
-- ============================================================

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journey ENABLE ROW LEVEL SECURITY;

-- Projects Policies
DROP POLICY IF EXISTS "Public read projects" ON public.projects;
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin write projects" ON public.projects;
CREATE POLICY "Admin write projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Blogs Policies
DROP POLICY IF EXISTS "Public read blogs" ON public.blogs;
CREATE POLICY "Public read blogs" ON public.blogs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin write blogs" ON public.blogs;
CREATE POLICY "Admin write blogs" ON public.blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Journey Policies
DROP POLICY IF EXISTS "Public read journey" ON public.journey;
CREATE POLICY "Public read journey" ON public.journey FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin write journey" ON public.journey;
CREATE POLICY "Admin write journey" ON public.journey FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================
-- STORAGE BUCKET FOR IMAGES & ASSETS
-- Creates 'portfolio-assets' bucket and sets public view policy
-- ============================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public view assets" ON storage.objects;
CREATE POLICY "Public view assets" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS "Admin upload assets" ON storage.objects;
CREATE POLICY "Admin upload assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-assets');

DROP POLICY IF EXISTS "Admin delete assets" ON storage.objects;
CREATE POLICY "Admin delete assets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-assets');

-- ============================================================
-- INITIAL SEED DATA (Your existing portfolio content)
-- ============================================================

-- Seed Projects
INSERT INTO public.projects (title, category, description, tags, github_url, live_url, featured, sort_order)
VALUES 
(
    'LinkLitez', 
    'Full Stack Web', 
    'Fast, lightweight link-in-bio and URL shortener built for creators and developers.', 
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Tailwind'], 
    'https://github.com/suyash-rgb', 
    'https://github.com/suyash-rgb', 
    true, 
    1
),
(
    'PresencePulse', 
    'AI & Automation', 
    'Real-time automated attendance and engagement tracker utilizing computer vision and audio signals.', 
    ARRAY['Python', 'OpenCV', 'FastAPI', 'React'], 
    'https://github.com/suyash-rgb', 
    'https://github.com/suyash-rgb', 
    true, 
    2
),
(
    'SmartEmail Classifier', 
    'AI & Machine Learning', 
    'AI-powered email prioritization and response suggestion engine built with NLP models.', 
    ARRAY['Python', 'Transformers', 'Flask', 'Machine Learning'], 
    'https://github.com/suyash-rgb', 
    'https://github.com/suyash-rgb', 
    true, 
    3
),
(
    'InvoiceApp', 
    'Enterprise Software', 
    'Streamlined invoice generation and financial tracking tool for freelance and consulting services.', 
    ARRAY['Java', 'Spring Boot', 'React', 'MySQL'], 
    'https://github.com/suyash-rgb', 
    'https://github.com/suyash-rgb', 
    false, 
    4
),
(
    'QuirkyRoomie', 
    'Mobile & Web', 
    'Roommate matching platform tailored for university students with compatibility score matching.', 
    ARRAY['React Native', 'Firebase', 'Express'], 
    'https://github.com/suyash-rgb', 
    'https://github.com/suyash-rgb', 
    false, 
    5
);

-- Seed Blogs
INSERT INTO public.blogs (title, excerpt, medium_url, tags, read_time, published_date)
VALUES 
(
    'Beyond AI Guardrails and Refusals: Why LMS Platforms Must Own Their Anti-Cheat Engines',
    'A deep dive into why modern learning management platforms and interview tools cannot rely solely on model-level refusals, and why native anti-cheat architectures are vital.',
    'https://medium.com/@suyashbaoney58/beyond-ai-guardrails-and-refusals-why-lms-platforms-must-own-their-anti-cheat-engines-e6ffc1a5cd83',
    ARRAY['AI Safety', 'EdTech', 'Machine Learning', 'Anti-Cheat'],
    '7 min read',
    '2026-10-01'
);

-- Seed Journey
INSERT INTO public.journey (year, title, organization, type, branch_name, commit_hash, description, status, sort_order)
VALUES 
(
    '2025',
    'Master''s in Computer Application',
    'ICA, Sage University',
    'edu',
    'main',
    'c4a91b2',
    'Currently pursuing Master''s in Computer Application with a focus on AI and Machine Learning.',
    'HEAD (Active)',
    1
),
(
    '2023',
    'Bachelor''s in Computer Application',
    'SVIMS, DAVV University',
    'edu',
    'main',
    'b7e289f',
    'Specialized in Back-end Development. Built 5+ enterprise & web applications.',
    'merged',
    2
),
(
    '2020-23',
    'Home Tutor',
    'Freelance / Self-Employed',
    'work',
    'feature/work',
    'f193dc0',
    'Mentored students across multiple subjects. Developed leadership, communication, and problem-solving skills.',
    'merged -> main',
    3
),
(
    '2022',
    'J2EE Training',
    'Java Enterprise Training',
    'training',
    'feature/training',
    'a903ef4',
    'Enrolled in specialized J2EE training, mastering core Java, Servlets, JSP, and enterprise application architecture.',
    'merged -> main',
    4
),
(
    '2019',
    'Higher Secondary (XII)',
    'St. George HSc School, Dhar',
    'edu',
    'main',
    'e102bc7',
    'PCM Stream. Led Red House to victory in inter-school competitions.',
    'init commit',
    5
);

