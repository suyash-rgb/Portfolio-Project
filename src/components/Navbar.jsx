import React, { useState } from 'react';
import { 
    isSupabaseConfigured, 
    supabaseUrl, 
    saveSupabaseCredentials, 
    clearSupabaseCredentials 
} from '../supabaseClient';
import { Database, Key, LogIn, LogOut, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Navbar({ user, onOpenAuth, onSignOut }) {
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [urlInput, setUrlInput] = useState(supabaseUrl || '');
    const [keyInput, setKeyInput] = useState('');

    const handleSave = (e) => {
        e.preventDefault();
        if (!urlInput || !keyInput) {
            alert('Please provide both Project URL and Anon Key');
            return;
        }
        saveSupabaseCredentials(urlInput, keyInput);
    };

    return (
        <header className="cms-header">
            <div className="cms-brand">
                <div className="cms-logo">SB</div>
                <div className="cms-title">
                    <h1>Portfolio CMS Studio</h1>
                    <p>Headless Management for Projects, Articles & Milestones</p>
                </div>
            </div>

            <div className="cms-nav-actions">
                {/* Supabase Connection Status */}
                {isSupabaseConfigured ? (
                    <div className="status-pill connected" title={supabaseUrl}>
                        <span className="status-dot-pulse"></span>
                        <CheckCircle2 size={13} />
                        <span>Supabase Connected</span>
                    </div>
                ) : (
                    <button 
                        className="status-pill disconnected"
                        onClick={() => setShowKeyModal(true)}
                        title="Click to configure Supabase credentials"
                    >
                        <AlertCircle size={13} />
                        <span>Connect Supabase</span>
                    </button>
                )}

                {/* API Keys Settings Button */}
                <button 
                    className="btn-secondary" 
                    onClick={() => setShowKeyModal(true)}
                    style={{ padding: '8px 12px', fontSize: '0.82rem' }}
                >
                    <Key size={14} />
                    <span>API Keys</span>
                </button>

                {/* Auth Button */}
                {user ? (
                    <button 
                        className="btn-secondary" 
                        onClick={onSignOut}
                        style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                    >
                        <LogOut size={14} />
                        <span>{user.email?.split('@')[0]} (Sign Out)</span>
                    </button>
                ) : (
                    <button 
                        className="btn-primary" 
                        onClick={onOpenAuth}
                        style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                    >
                        <LogIn size={14} />
                        <span>Admin Login</span>
                    </button>
                )}
            </div>

            {/* Supabase API Key Configuration Modal */}
            {showKeyModal && (
                <div className="modal-overlay" onClick={() => setShowKeyModal(false)}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Supabase Connection Settings</h3>
                            <button className="close-btn" onClick={() => setShowKeyModal(false)}>✕</button>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '18px' }}>
                            You can set these in your local <code>.env</code> file (recommended) or paste them here to store in your browser.
                        </p>
                        <form onSubmit={handleSave}>
                            <div className="form-group">
                                <label>Supabase Project URL</label>
                                <input 
                                    type="text" 
                                    placeholder="https://xyzcompany.supabase.co" 
                                    value={urlInput}
                                    onChange={e => setUrlInput(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Supabase Anon Public API Key</label>
                                <input 
                                    type="password" 
                                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..." 
                                    value={keyInput}
                                    onChange={e => setKeyInput(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                {isSupabaseConfigured && (
                                    <button 
                                        type="button" 
                                        className="btn-danger" 
                                        onClick={clearSupabaseCredentials}
                                    >
                                        Reset Credentials
                                    </button>
                                )}
                                <button type="submit" className="btn-primary">
                                    Save & Connect
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
}

