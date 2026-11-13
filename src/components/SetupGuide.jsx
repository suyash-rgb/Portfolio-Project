import React, { useState } from 'react';
import { Database, Copy, Check, Terminal, Code2, ShieldAlert } from 'lucide-react';

export default function SetupGuide() {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const copyToClipboard = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const frontendCodeSample = `// How to fetch dynamic projects from Supabase in Portfolio.jsx
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
        
      if (!error && data) setProjects(data);
    }
    loadProjects();
  }, []);

  return (
    <div>
      {projects.map(item => (
        <ProjectCard key={item.id} project={item} />
      ))}
    </div>
  );
}`;

    return (
        <section style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="section-action-header" style={{ marginBottom: '24px' }}>
                <div>
                    <h2>Supabase Setup & Portfolio Integration Guide</h2>
                    <p>Follow these 3 quick steps to activate your real-time cloud database.</p>
                </div>
            </div>

            {/* Step 1 */}
            <div className="setup-step">
                <h3 style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="step-num">1</span>
                    Create Your Free Supabase Project
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>
                    Go to <a href="https://supabase.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>supabase.com</a>, 
                    sign in with your GitHub account, and click <strong>"New Project"</strong>. 
                    Choose a database password and select the region closest to you (e.g. Mumbai / India or Singapore).
                </p>
            </div>

            {/* Step 2 */}
            <div className="setup-step">
                <h3 style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="step-num">2</span>
                    Run the Database Schema in Supabase SQL Editor
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '14px' }}>
                    In your Supabase dashboard, navigate to the <strong>SQL Editor</strong> tab on the left sidebar. 
                    Open the file <code>supabase-schema.sql</code> included in this project, copy its contents, and hit <strong>Run</strong>.
                </p>
                <div style={{ background: '#f5f3ff', border: '1px dashed #c4b5fd', borderRadius: '8px', padding: '12px 16px', color: '#6d28d9', fontSize: '0.84rem' }}>
                    ✓ Creates <code>projects</code>, <code>blogs</code>, and <code>journey</code> tables with Row-Level Security (RLS).<br/>
                    ✓ Configures <code>portfolio-assets</code> storage bucket with public read access.<br/>
                    ✓ Automatically seeds your existing portfolio data (LinkLitez, PresencePulse, Medium articles, etc.).
                </div>
            </div>

            {/* Step 3 */}
            <div className="setup-step">
                <h3 style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="step-num">3</span>
                    Get Your API Keys & Save to .env
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>
                    In Supabase, go to <strong>Project Settings → API</strong>. Copy your <strong>Project URL</strong> and <strong>anon (public) Key</strong> into your <code>.env</code> file:
                </p>
                <div className="code-box" style={{ position: 'relative' }}>
                    VITE_SUPABASE_URL=https://your-project-id.supabase.co<br/>
                    VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                </div>
            </div>

            {/* Integration Code Sample */}
            <div className="setup-step" style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                        <Code2 size={18} color="#06b6d4" />
                        Portfolio Integration Code Snippet
                    </h3>
                    <button 
                        className="btn-secondary" 
                        onClick={() => copyToClipboard(frontendCodeSample, 'sample')}
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                        {copiedIndex === 'sample' ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                        <span>{copiedIndex === 'sample' ? 'Copied' : 'Copy Code'}</span>
                    </button>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '14px' }}>
                    In your portfolio (<code>latest</code> branch), you can fetch live projects and articles with zero rebuilds:
                </p>
                <pre className="code-box" style={{ maxHeight: '320px' }}>
                    {frontendCodeSample}
                </pre>
            </div>
        </section>
    );
}

