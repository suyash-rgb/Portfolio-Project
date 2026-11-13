import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProjectsManager from './components/ProjectsManager';
import BlogsManager from './components/BlogsManager';
import JourneyManager from './components/JourneyManager';
import SetupGuide from './components/SetupGuide';
import AuthModal from './components/AuthModal';
import { supabase, isSupabaseConfigured } from './supabaseClient';
import { Layers, BookOpen, GitBranch, Settings, Info } from 'lucide-react';

export default function App() {
    const [activeTab, setActiveTab] = useState('projects');
    const [user, setUser] = useState(null);
    const [authModalOpen, setAuthModalOpen] = useState(false);

    useEffect(() => {
        if (!isSupabaseConfigured || !supabase) return;

        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        if (supabase) {
            await supabase.auth.signOut();
            setUser(null);
        }
    };

    return (
        <div className="cms-app">
            <Navbar 
                user={user} 
                onOpenAuth={() => setAuthModalOpen(true)}
                onSignOut={handleSignOut}
            />

            {!isSupabaseConfigured && (
                <div style={{
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    color: '#fbbf24',
                    fontSize: '0.88rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Info size={18} />
                        <span>
                            <strong>Demo Mode Active:</strong> Supabase credentials are not connected yet. 
                            Viewing local mock data. Connect Supabase to enable real-time cloud sync.
                        </span>
                    </div>
                    <button 
                        className="btn-secondary" 
                        onClick={() => setActiveTab('setup')}
                        style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                    >
                        View Setup Guide
                    </button>
                </div>
            )}

            {/* Navigation Tabs */}
            <div className="cms-tabs">
                <button 
                    className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                >
                    <Layers size={16} />
                    <span>Projects</span>
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
                    onClick={() => setActiveTab('blogs')}
                >
                    <BookOpen size={16} />
                    <span>Articles & Blogs</span>
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'journey' ? 'active' : ''}`}
                    onClick={() => setActiveTab('journey')}
                >
                    <GitBranch size={16} />
                    <span>Journey / Education</span>
                </button>
                <button 
                    className={`tab-btn ${activeTab === 'setup' ? 'active' : ''}`}
                    onClick={() => setActiveTab('setup')}
                >
                    <Settings size={16} />
                    <span>Database Setup Guide</span>
                </button>
            </div>

            {/* Tab Views */}
            <main>
                {activeTab === 'projects' && (
                    <ProjectsManager 
                        user={user} 
                        onRequireAuth={() => setAuthModalOpen(true)} 
                    />
                )}
                {activeTab === 'blogs' && (
                    <BlogsManager 
                        user={user} 
                        onRequireAuth={() => setAuthModalOpen(true)} 
                    />
                )}
                {activeTab === 'journey' && (
                    <JourneyManager 
                        user={user} 
                        onRequireAuth={() => setAuthModalOpen(true)} 
                    />
                )}
                {activeTab === 'setup' && (
                    <SetupGuide />
                )}
            </main>

            {/* Auth Modal */}
            <AuthModal 
                isOpen={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                onAuthSuccess={(u) => setUser(u)}
            />
        </div>
    );
}
